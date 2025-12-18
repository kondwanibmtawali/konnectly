/* 
CountryPage.jsx - 12/01/2025
Individual country detail page that zooms into country upon click from main map page. 
- Renders map using same mechanism as AfricaOverview(SVG, D3, GeoJSON)
- Calls useCountryDetail to call GET request to API for country data
- Displays sidebar with country data
- Includes investment pathway generation button
*/
import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useRef for DOM element access
import { geoMercator, geoPath } from "d3-geo";
import africaData from "../data/africa.geojson?raw";
import { useCountryDetail } from "../hooks/clickCountry"; // custom hook for API call

export default function AfricanCountry() {
    const { name } = useParams(); // country names"
    const navigate = useNavigate();
    const svgRef = useRef(null); //
    const gRef = useRef(null); // reference to the group we zoom
    const displayName = decodeURIComponent(name || ""); // converts URL-encoded names to human readable
    const { country: selected, loading: detailLoading, fetchCountry } = useCountryDetail(); // custom hook function utility

    // Renders map with pan+zoom on country
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg || !africaData || !name) return; // safety check
        //Forces full page width
        const width = window.innerWidth;
        const height = window.innerHeight;
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.innerHTML = "";

        // Create group for zoom
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        gRef.current = g;
        svg.appendChild(g);

        //D3 Projection Setup: Map Display Configurations
        const projection = geoMercator()
            .center([20, 0])
            .scale(width * 0.48)
            .translate([width / 2, height / 2]);
        //Converts GeoJSON components into <svg> path formats
        const pathGenerator = geoPath().projection(projection);
        // GeoJSON parsing to JS Object
        let parsed;
        try {
            parsed = JSON.parse(africaData);
        } catch (e) {
            console.error("JSON parse failed", e);
            return;
        }

        let targetFeature = null; // initial declaration of GeoJSON feature

        // Loops through countries, draws each path
        parsed.features.forEach(feature => {
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path"); // initializes SVG path element
            pathEl.setAttribute("d", pathGenerator(feature) || "");

            // Highlight selected country
            const props = feature.properties || {}
            const countryName = props.name || "";
            const isSelected = countryName === displayName; // checks country in URL
            // Selected country styling
            pathEl.setAttribute("fill", isSelected ? "#ff8c42" : "#74B266");
            pathEl.setAttribute("stroke", "#111");
            pathEl.setAttribute("stroke-width", isSelected ? "3" : "1.5");

            if (isSelected) {
                targetFeature = feature; // identifies country for zoom
            }

            g.appendChild(pathEl); // adds path to svg
        });

        // Zoom to selected country
        if (targetFeature && gRef.current) {
            const bounds = pathGenerator.bounds(targetFeature);
            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            const x = (bounds[0][0] + bounds[1][0]) / 2;
            const y = (bounds[0][1] + bounds[1][1]) / 2;
            const scale = 0.9 / Math.max(dx / width, dy / height);
            const finalScale = Math.min(12, Math.max(2, scale));

            const translateX = width / 2 - finalScale * x;
            const translateY = height / 2 - finalScale * y;

            gRef.current.style.transition = "transform 800ms ease-in-out"; // supposed to add panning effect, adjust for effectiveness
            gRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${finalScale})`;
        }

    }, [displayName]);

    // Isolated API Fetch -> this is where clickCountry comes into play
    useEffect(() => {
        if (displayName) {
            fetchCountry(displayName);
        }
    }, [displayName, fetchCountry]); // Dependencies: displayName is in URL, fetchCountry prevents infinite loop?

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#111" }}>
            {/* Country Name Display*/}
            <h1
                style={{
                    position: "absolute",
                    top: "40px",
                    left: "25%",
                    transform: "translateX(-50%)",
                    color: "white",
                    fontSize: "3.8rem",
                    fontWeight: "bold",
                    textShadow: "0 4px 12px rgba(0,0,0,0.8)",
                    zIndex: 200,
                    pointerEvents: "none",
                }}
            >
                {displayName || "Loading..."}
            </h1>

            {/* Full-screen SVG map */}
            <svg
                ref={svgRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "#111",
                }}
            />

            {/* Right sidebar with API data */}
            <div
                style={{
                    position: "fixed",
                    right: 0,
                    top: 0,
                    width: "420px",
                    height: "100vh",
                    background: "white",
                    boxShadow: "-10px 0 40px rgba(0,0,0,0.4)",
                    overflowY: "auto",
                    padding: "120px 40px 40px 40px",
                    zIndex: 150,
                    color: "black",
                }}
            >

                {/* Reusable Component: Loops through data in API + ensures correct display */}
                {/* Take notes on AI Generated: InfoItem Loop Structure */}
                {(() => {
                    const InfoItem = ({ label, value, suffix = "" }) => (
                        <div style={{ marginBottom: "28px" }}>
                            <strong style={{ fontSize: "1.2rem" }}>{label}:</strong>
                            <span style={{ marginLeft: "12px", fontSize: "1.1rem" }}>
                                {value ?? "N/A"}{suffix}
                            </span>
                        </div>
                    );

                    return (
                        <>
                            {detailLoading ? (
                                <p style={{ fontSize: "1.3rem", color: "#666" }}>Loading country data...</p>
                            ) : selected ? (
                                <>
                                    <InfoItem
                                        label="GDP"
                                        value={selected.gdp && `$${selected.gdp.toLocaleString()}`}
                                        suffix={selected.gdp_growth_rate && ` (+${selected.gdp_growth_rate.toFixed(1)}%)`}
                                    />

                                    <InfoItem
                                        label="Gross National Income"
                                        value={selected.gross_national_income && `$${selected.gross_national_income.toLocaleString()}`}
                                    />

                                    <InfoItem
                                        label="Population"
                                        value={selected.population && `${(selected.population / 1_000_000).toFixed(1)} million`}
                                        suffix={selected.population_growth_rate && ` (+${selected.population_growth_rate.toFixed(1)}%)`}
                                    />

                                    <InfoItem
                                        label="Labor Force Participation"
                                        value={selected.labor_force_participation && `${selected.labor_force_participation.toFixed(1)}%`}
                                    />

                                    <InfoItem
                                        label="Exchange Rate to USD"
                                        value={selected.exchange_rate_to_usd?.toFixed(4)}
                                    />

                                    <InfoItem
                                        label="Merchandise Trade (% of GDP)"
                                        value={selected.merchandise_trade?.toFixed(1)}
                                    />

                                    <InfoItem
                                        label="Tariff Rate"
                                        value={selected.tariff_rate && `${selected.tariff_rate.toFixed(2)}%`}
                                    />

                                    <InfoItem
                                        label="Value of Exports"
                                        value={selected.value_of_exports && `$${selected.value_of_exports.toLocaleString()}`}
                                    />

                                    <InfoItem
                                        label="Value of Imports"
                                        value={selected.value_of_imports && `$${selected.value_of_imports.toLocaleString()}`}
                                    />

                                    <InfoItem
                                        label="Trade Rating"
                                        value={selected.trade_rating && `${selected.trade_rating}/6`}
                                    />

                                    <InfoItem
                                        label="FDI (% of GDP)"
                                        value={selected.fdi_percentage && `${selected.fdi_percentage.toFixed(2)}%`}
                                    />

                                    <InfoItem
                                        label="Political Stability"
                                        value={selected.political_stability_percentile && `${selected.political_stability_percentile.toFixed(1)}th percentile`}
                                    />

                                    {/* Generate Investment Pathway Button: Navigates to Investment Page */}
                                    <button
                                        onClick={() => navigate(`/investment/${encodeURIComponent(selected.name)}`, { state: { countryData: selected } })}
                                        style={{
                                            marginTop: "40px",
                                            padding: "16px 32px",
                                            fontSize: "1.2rem",
                                            background: "#27ae60",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "12px",
                                            cursor: "pointer",
                                            width: "100%",
                                            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        Generate Investment Opportunities
                                    </button>
                                </>


                            ) : (

                                <p style={{ fontSize: "1.3rem", color: "#666" }}>
                                    No data available for {displayName} {/* Countries w/ spaces in name need debugging */}
                                </p>

                            )}
                        </>
                    );
                })()}
            </div>

        </div>
    )
} 
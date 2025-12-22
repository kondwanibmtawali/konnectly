/* 
AfricaOverview.jsx - 11.29.2025
- Defines AfricaMap to render interactive map of Africa
- Utilizes D3 & GeoJSON data to draw SVG paths and render SVG map
- Allows interactivity with map leveraging states
*/

import React, { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import africaData from "../data/africa.geojson?raw"; // provided raw for manual parsing
import { useNavigate } from "react-router-dom";
import { useCountryDetail } from "../hooks/clickCountry"; // custom hook for API call

export default function AfricaMap() {
    const svgRef = useRef(null); // used as reference to <svg> in return
    const navigate = useNavigate();
    const { fetchCountry } = useCountryDetail(); // fetch API function from hook

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg || !africaData) return;

        // Force full viewport size
        const width = window.innerWidth;
        const height = window.innerHeight;
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        svg.innerHTML = "";

        //D3 Projection Setup: Map Display Configurations
        const projection = geoMercator()
            .center([20, 5])
            .scale(width * 0.30)
            .translate([width / 2, height / 2.2]);

        //Converts GeoJSON components into <svg> path formats
        const pathGenerator = geoPath().projection(projection);

        //Parsing the JSON data -> Converts to JS Object 
        let parsed;
        try {
            parsed = JSON.parse(africaData);
        } catch (e) {
            console.error("JSON parse failed", e);
            return;
        }

        //Loop: Extracts properties from country data 
        parsed.features.forEach(feature => {
            const props = feature.properties || {};
            const name = props.name || "Unknown";

            //SVG Path element with correct XML Namespace
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path"); // initializes SVG path element
            //Converts country polygon coordinates into an SVG <d> path string
            pathEl.setAttribute("d", pathGenerator(feature) || "");
            //Custom styling for country
            pathEl.setAttribute("fill", "#74B266");
            pathEl.setAttribute("stroke", "#111");
            pathEl.setAttribute("stroke-width", "1.5");
            pathEl.style.cursor = "pointer";
            const titleEl = document.createElementNS("http://www.w3.org/2000/svg", "title");
            titleEl.textContent = `${name}`;
            pathEl.appendChild(titleEl);

            //Interactivity: Cursor change on hover
            pathEl.onclick = () => {
                fetchCountry(name); //API Call
                navigate(`/country/${encodeURIComponent(name)}`)
            };
            pathEl.onmouseenter = () => pathEl.setAttribute("fill", "#ff8c42");
            pathEl.onmouseleave = () => pathEl.setAttribute("fill", "#74B266");

            //Adds the path to the svg
            svg.appendChild(pathEl);
        });
    }, []);

    return (
        <>
            {/* Single SVG(The Map) takes the entire screen */}
            <svg
                ref={svgRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "#111",
                    display: "block",
                }}
            />
            {/* Description Box - Top Left */}
            <div
                style={{
                    position: "fixed",
                    top: "30px",
                    left: "10px",
                    maxWidth: "400px",
                    background: "rgba(17, 17, 17, 0.85)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    padding: "24px",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    zIndex: 100,
                    fontFamily: "system-ui, sans-serif",
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <h2 style={{ margin: "0 0 16px 0", fontSize: "1.8rem", fontWeight: "bold" }}>
                    Konnectly
                </h2>
                <p style={{ margin: "0 0 12px 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
                    An interactive platform exploring investment opportunities across African countries.
                </p>
                <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.6, opacity: 0.9 }}>
                    Click any country to view real economic data  and generate AI-powered investment pathways.
                </p>
            </div>
        </>
    );
}
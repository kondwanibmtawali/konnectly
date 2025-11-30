/* 
AfricanMap.jsx - 11.30.2025
- Defines AfricaMap to render interactive map of Africa
- Utilizes D3 & GeoJSON data to draw SVG paths and generate map
- Allows interactivity with map leveraging states
*/

import React, { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import africaData from "../data/africa.geojson?raw";   // keep this exact line

export default function AfricaMap() {
    const svgRef = useRef(null); //used as reference to <svg> in return
    const [selected, setSelected] = useState(null);

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
            .center([20, 0])
            .scale(width * 0.48)
            .translate([width / 2, height / 2]);

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

        //Extracts properties from country data
        parsed.features.forEach(feature => {
            const props = feature.properties || {};
            const name = props.ADMIN || props.NAME || "Unknown";
            const code = props.ISO_A2 || props.ISO_A3 || "??";

            //SVG Path element with correct XML Namespace
            const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
            //Converts country polygon coordinates into an SVG <d> path string
            pathEl.setAttribute("d", pathGenerator(feature) || "");
            //Custom styling for country
            pathEl.setAttribute("fill", "#74B266");
            pathEl.setAttribute("stroke", "#111");
            pathEl.setAttribute("stroke-width", "1.5");
            pathEl.style.cursor = "pointer"; //Cursor change on hover

            //Interactivity
            pathEl.onclick = () => setSelected({ name, code });
            pathEl.onmouseenter = () => pathEl.setAttribute("fill", "#ff8c42");
            pathEl.onmouseleave = () => pathEl.setAttribute("fill", "#74B266");

            //Adds the path to the svg
            svg.appendChild(pathEl);
        });
    }, []);

    return (
        <>
            {/* Single SVG(The Map) takes the entire screen*/}
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

            {/* Conditional Modal if country is clicked */}
            {selected && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "60px 80px",
                            borderRadius: "20px",
                            textAlign: "center",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                        }}
                        onClick={e => e.stopPropagation()} //Prevents clicks inside the modal triggering parent <div> onClick
                    >
                        <h1 style={{ margin: "0 0 20px", fontSize: "3rem" }}>
                            {selected.name}
                        </h1>
                        <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
                            ISO: <strong>{selected.code}</strong>
                        </p>
                        <button
                            onClick={() => setSelected(null)}
                            style={{
                                padding: "16px 40px",
                                fontSize: "1.3rem",
                                background: "#ff8c42",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                cursor: "pointer",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
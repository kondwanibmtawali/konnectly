/* 
Investments.jsx - 12/11/2025 -> COMPLETE BY PRESENTATION
Separate page for AI-generated investment pathway walkthrough set up with personal OpenAI API key.
- Displays AI-generated investment opportunity of given country selected
- Accesses country-page's API obtained country data
- Utilizes generateInvestments.js hook to generate AI response
*/

import React, { useEffect } from "react"; // only for console debug
import { useLocation } from "react-router-dom"; // used for passing data between pages
import { useGenerateInvestment } from "../hooks/generateInvestments";

export default function InvestmentPage() {
    const location = useLocation();
    const countryData = location.state?.countryData;  // maintains access to country data from CountryPage.jsx

    const { response, loading, error } = useGenerateInvestment(countryData);

    // Safety Check
    if (!countryData) {
        return <div style={{ padding: "40px", color: "white", background: "#111", minHeight: "100vh" }}>
            <h1>No country data available</h1>
        </div>;
    }
    // Debugging: remove
    useEffect(() => {
        console.log("Investments page received countryData:", countryData);
    }, [countryData]);

    return (
        <>
            {/* Container for text display */}
            <div style={{ background: "#111", minHeight: "100vh", color: "white", padding: "40px" }}>
                <h1 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "40px" }}>
                    Investment Opportunities in {countryData.name}
                </h1>

                <div style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    background: "white",
                    color: "#333",
                    padding: "40px",
                    borderRadius: "16px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}>
                    {/* AI Generated JSX for Loading Screen -> NEEDS ADJUSTING */}
                    {loading ? (
                        <p style={{ fontSize: "1.3rem", textAlign: "center" }}>Generating detailed AI investment response...</p>
                    ) : error ? (
                        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                    ) : response ? (
                        <div style={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                            <pre style={{ whiteSpace: "pre-wrap" }}>{response}</pre>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
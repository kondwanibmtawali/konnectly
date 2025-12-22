/* 
Investments.jsx - 12/11/2025 -> COMPLETE BY PRESENTATION
Separate page for AI-generated investment pathway walkthrough set up with personal OpenAI API key.
- Displays AI-generated investment opportunity of given country selected
- Accesses country-page's API obtained country data
- Utilizes generateInvestments.js hook to generate AI response
*/

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGenerateInvestment } from "../hooks/generateInvestments";
// Optional: Use a lightweight markdown parser
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // for tables, strikethrough, etc.

export default function InvestmentPage() {
    const location = useLocation();
    const countryData = location.state?.countryData;

    const { response, loading, error } = useGenerateInvestment(countryData);

    if (!countryData) {
        return (
            <div style={{ padding: "40px", color: "white", background: "#111", minHeight: "100vh" }}>
                <h1>No country data available</h1>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "#1e293b",
            color: "white",
            padding: "60px 20px",
            fontFamily: "system-ui, -apple-system, sans-serif",

        }}>
            {/* Title */}
            <h1 style={{
                textAlign: "center",
                fontSize: "3.2rem",
                fontWeight: "700",
                marginBottom: "60px",
                letterSpacing: "-0.5px",
            }}>
                Investment Opportunities in {countryData.name}
            </h1>

            {/* Main Content Card - Centered */}
            <div style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto", // This centers the card
                background: "white",
                color: "#1e293b",
                borderRadius: "20px",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
                overflow: "hidden",
            }}>
                {/* Loading State */}
                {loading && (
                    <div style={{
                        padding: "100px 40px",
                        textAlign: "center",
                        fontSize: "1.4rem",
                        color: "#64748b",
                    }}>
                        <div style={{
                            width: "50px",
                            height: "50px",
                            border: "5px solid #f3f3f3",
                            borderTop: "5px solid #64748b",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 20px",
                        }} />
                        <p>Generating investment pathways...</p>
                    </div>
                )}

                {/* AI-Generated Content - Properly Styled Markdown */}
                {response && !loading && (
                    <div style={{
                        padding: "60px 80px",
                        lineHeight: "1.8",
                        fontSize: "1.15rem",
                        textAlign: "left",
                    }}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => <h1 style={{ fontSize: "2.2rem", margin: "40px 0 20px", fontWeight: "bold" }}>{children}</h1>,
                                h2: ({ children }) => <h2 style={{ fontSize: "1.8rem", margin: "36px 0 16px", fontWeight: "bold", color: "#1e293b" }}>{children}</h2>,
                                h3: ({ children }) => <h3 style={{ fontSize: "1.5rem", margin: "32px 0 14px", fontWeight: "600", color: "#334155" }}>{children}</h3>,
                                p: ({ children }) => <p style={{ margin: "16px 0", color: "#334155" }}>{children}</p>,
                                ul: ({ children }) => <ul style={{ margin: "16px 0", paddingLeft: "28px", color: "#334155" }}>{children}</ul>,
                                li: ({ children }) => <li style={{ margin: "8px 0" }}>{children}</li>,
                                strong: ({ children }) => <strong style={{ color: "#1e293b" }}>{children}</strong>,
                            }}
                        >
                            {response}
                        </ReactMarkdown>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div style={{ padding: "80px", textAlign: "center", color: "#ef4444" }}>
                        <p>Error generating report: {error}</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <p style={{
                textAlign: "center",
                marginTop: "60px",
                fontSize: "1rem",
                opacity: 0.7,
            }}>
                Generated by Grok AI | Real economic data | AI-powered investment insights | Updated for 2025
            </p>
        </div>
    );
}
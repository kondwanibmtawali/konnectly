/*
useGenerateInvestments.js - 12/11/2025 -> EXPERIMENT MORE W/ PROMPT
Generates a detailed breakdown of investment pathways for a given country using Grok-4 LLM via xAI's API.
- Takes countryData from backend API as input as part of prompt 
- Includes personally defined instructions as part of prompt 
- Utilizes open ai's library to create API client for calling LLM(Grok-4)
*/
import { useState, useEffect } from "react";
import OpenAI from "openai"; // open ai client API library 

export const useGenerateInvestment = (countryData) => {
    // Handles states
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Safety Check
    useEffect(() => {
        if (!countryData) return;
        // Reset states before fetching
        setLoading(true);
        setError("");
        setResponse("");

        console.log("Starting LLM call for:", countryData.name); // debug: remove

        // Creates API client for xAI(Grok4)
        const openai = new OpenAI({
            apiKey: import.meta.env.VITE_GROK_API_KEY, // personal key in .env(hidden for security)
            baseURL: "https://api.x.ai/v1",  // xAI's endpoint...
            dangerouslyAllowBrowser: true,   // override security check(dev purposes only)
        });

        // Prompt is a defined string 
        // Accesses country data(w/ specified formatting & potential null values) 
        // Data passed as parameter in func call
        const prompt = `I'm a foreigner, interested in making foreign direct investment in African countries. Provide me with a detailed, fact-based, investment opportunities response for ${countryData.name}.

Use this API data:
- GDP: $${countryData.gdp?.toLocaleString() || "N/A"} (growth: ${countryData.gdp_growth_rate || "N/A"}%)
- Population: ${(countryData.population / 1_000_000).toFixed(1)} million (growth: ${countryData.population_growth_rate || "N/A"}%)
- FDI: ${countryData.fdi_percentage || "N/A"}% of GDP
- Trade Rating: ${countryData.trade_rating || "N/A"}/100
- Merchandise Trade: ${countryData.merchandise_trade || "N/A"}% of GDP
- Tariff Rate: ${countryData.tariff_rate || "N/A"}%
- Exports: $${countryData.value_of_exports?.toLocaleString() || "N/A"}
- Imports: $${countryData.value_of_imports?.toLocaleString() || "N/A"}
- Political Stability: ${countryData.political_stability_percentile || "N/A"}th percentile
- Labor Force Participation: ${countryData.labor_force_participation || "N/A"}%

Generate the following in plaintext format:
1) Begin with a simple disclaimar that this is an AI generated investment strategy.
2) Without an overview, provide 3 Investment Pathways (numbered, 3-4 sentences each, with sector, rationale based on data, and a proven entry strategy)
3) For Each Investment Pathway, construct a detailed step by step approach an individual living in a foreign country can take to participate in the investment pathway.
4) Risks & Mitigation (bullet points, grounded in data like political responsibility)


Be professional, actionable, and optimistic but realistic for 2025-2030. Base your information on data, citing sources with links. Output response with a consistent structure.`;

        // Calls Grok-4 to generate prompt response  
        openai.chat.completions
            .create({
                messages: [{ role: "user", content: prompt }],
                reasoning: { effort: "high" },
                model: "grok-4",
                temperature: 0.5, // Model creativity use? -> lower = more consistency
                max_tokens: 1500, // Output Limit
            })
            .then((res) => { // sucess event
                console.log("LLM Success:", res);  // debugging
                if (res.choices?.[0]?.message?.content) {
                    setResponse(res.choices[0].message.content.trim()); // extracts generated text from LLM
                } else {
                    setError("Empty response from LLM");
                }
            })
            .catch((err) => { // fail event
                console.error("LLM Error:", err);  // debug 
                setError(`LLM failed: ${err.message || "Unknown error"}`);
            })
            .finally(() => setLoading(false)); // stop running if still loading
    }, [countryData]); // Dependent on country data passed as param in func call

    return { response, loading, error };
};
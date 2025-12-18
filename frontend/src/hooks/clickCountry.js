/* 
clickCountry.JS - 11.30.2025
Custom hook to view country data of a specific country
- Acts as a reuseable function to lead country data from API
- Allows REACT components to trigger fetch(function) by country name
- Waits for fetchCountry(name) to be called
*/
import { useCallback, useState } from "react"; // Memoization - provides stability to useEffect calls
import axios from "axios"; // library used for HTTP requests
import { API_URL } from "../constants"; // API URL stored in frontend

// Hook Declaration: fetches country handles loading state and errors
export const useCountryDetail = () => {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function for API call: prevents infinite loops, resets error/loading states 
    const fetchCountry = useCallback((name) => {
        setLoading(true);
        setError(null);
        setCountry(null);

        axios
            .get(`${API_URL}/${encodeURIComponent(name)}/`) // API GET request
            .then((res) => setCountry(res.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { country, loading, error, fetchCountry };
};
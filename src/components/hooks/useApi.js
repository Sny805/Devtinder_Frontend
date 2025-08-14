import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../utills/constants";

export const useApi = ({ url, method = "GET", body = null, params = {}, autoFetch = true }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (overrideBody = null) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios({
                url: `${BASE_URL}${url}`,
                method,
                data: overrideBody || body,
                params,
                withCredentials: true
            });

            setData(res.data);
            return res.data; // so we can use it directly if needed
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [url, method, body, params]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [fetchData, autoFetch]);

    return { data, loading, error, refetch: fetchData };
};

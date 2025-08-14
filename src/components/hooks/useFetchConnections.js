import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from "../../utills/constants";
import axios from 'axios';
import { addConnections } from '../../utills/connectionsSlice';

const useFetchConnections = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch()


    const fetchConnections = async () => {
        try {
            setIsLoading(true);
            setError(null)
            const res = await axios.get(BASE_URL + "user/connections", { withCredentials: true });

            dispatch(addConnections(res.data.data))
        }
        catch (err) {
            console.error(err.message)
            setError("Unable to fetch connections Data")
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    return { connections, isLoading, error }
}

export default useFetchConnections
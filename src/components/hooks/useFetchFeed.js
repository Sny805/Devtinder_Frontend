import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utills/feedSlice";
import { BASE_URL } from "../../utills/constants";


const useFetchFeed = () => {

    const dispatch = useDispatch()
    const feedData = useSelector((store) => store.feed)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    const getFeed = async () => {
        if (feedData && feedData.length > 0) return
        try {
            setIsLoading(true)
            setError(null)
            const res = await axios.get(`${BASE_URL}feed`, { withCredentials: true })
            dispatch(addFeed(res.data));

        } catch (err) {
            console.error("Failed to fetch Data", err)
            setError("Unable to fetch Feed Data")
        }
        finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        if (!hasFetched.current)
            hasFetched.current = true
        getFeed();
    }, [])

    return { isLoading, error, feedData }
}

export default useFetchFeed
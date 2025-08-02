import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utills/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utills/feedSlice'
import UserCard from './Cards/UserCard'

const Feed = () => {
    const dispatch = useDispatch()
    const feedData = useSelector((store) => store.feed)

    const getFeed = async () => {
        try {
            const res = await axios.get(`${BASE_URL}feed`, { withCredentials: true })
            dispatch(addFeed(res.data));

        } catch (err) {
            console.error("Failed to fetch Data", err)
        }

    }

    useEffect(() => {
        if (!feedData)
            getFeed();
    }, [])

    if (!feedData) return

    if (feedData.length === 0) {
        return <p className="text-center text-xl font-semibold mt-10">No Feed Found</p>;
    }


    return (
        feedData && (<div className='flex justify-center items-center mt-6'>
            <UserCard data={feedData[0]} isFeed={true} />

        </div>)



    )
}

export default Feed
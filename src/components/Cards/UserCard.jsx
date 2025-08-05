import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../utills/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../utills/feedSlice';
import { Heart, X } from 'lucide-react';
import { toast } from 'react-toastify';

const UserCard = ({ data, isFeed }) => {
    const dispatch = useDispatch();

    const handleRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "request/send/" + status + "/" + userId, {}, { withCredentials: true })

            dispatch(removeFeed(userId))
            toast.success(res?.data?.message)
        }
        catch (err) {
            console.error(err.message);
        }
    }



    const { firstName, lastName, photoUrl, age, gender, about, _id } = data

    return (
        <div className="card bg-base-300 w-80 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    alt="img url" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{age && gender && <p>{age}  {gender}</p>}</p>
                <p>{about}</p>
                {isFeed && <div className="flex gap-2 mt-2">
                    <button
                        className="flex-1 flex items-center justify-center gap-1 bg-pink-500 hover:bg-pink-600 text-white text-sm py-2 rounded-md transition"
                        onClick={() => handleRequest("interested", _id)}
                    >
                        <Heart className="w-4 h-4" />
                        Interested
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 rounded-md transition"
                        onClick={() => handleRequest("ignored", _id)}
                    >
                        <X className="w-4 h-4" />
                        Ignore
                    </button>
                </div>}

            </div>
        </div>
    )
}

export default UserCard
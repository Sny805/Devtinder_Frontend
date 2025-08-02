import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../utills/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../utills/feedSlice';

const UserCard = ({ data }) => {
    const dispatch = useDispatch();

    const handleRequest = async (status, userId) => {
        try {
            await axios.post(BASE_URL + "request/send/" + status + "/" + userId, {}, { withCredentials: true })
            dispatch(removeFeed(userId))
        }
        catch (err) {
            console.error(err.message);
        }
    }



    const { firstName, lastName, photoUrl, age, gender, about, _id } = data

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    alt="img url" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <p>{age && gender && <p>{age}  {gender}</p>}</p>
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-secondary" onClick={() => handleRequest("interested", _id)}>Interested</button>
                    <button className="btn btn-primary" onClick={() => handleRequest("ignored", _id)}>Ignore</button>

                </div>
            </div>
        </div>
    )
}

export default UserCard
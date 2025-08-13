import React from 'react'
import { Link } from 'react-router-dom';

const ConnectionsCard = ({ connection, button, id, reviewRequests }) => {
    const { firstName, lastName, about, gender, photoUrl, skills, age, _id } = connection;

    return (
        <div className="card card-side bg-base-300 shadow-xl p-4">
            <figure className="w-48 h-48 overflow-hidden rounded-xl">
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                    alt={`${firstName} ${lastName}`}
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-xl">{firstName} {lastName}</h2>
                <p className="text-sm text-gray-300"><strong>Gender:</strong> {gender && gender}</p>
                <p className="text-sm text-gray-300"><strong>Age:</strong> {age && age}</p>
                <p className="text-sm text-gray-300"><strong>About:</strong> {about}</p>

                {skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                            <div key={index} className="badge badge-secondary">{skill}</div>
                        ))}
                    </div>
                )}
                {
                    button == true ? <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary" onClick={() => reviewRequests("accepted", id)}>Accept</button>
                        <button className="btn btn-secondary" onClick={() => reviewRequests("rejected", id)}>Reject</button>
                    </div> : <div className="card-actions justify-end mt-4">
                        <Link to={`/chat/${_id}`}><button className="btn btn-primary" >Chat</button></Link>
                        <button className="btn btn-secondary" >View Profile</button>
                    </div>
                }

            </div>
        </div>
    );
}

export default ConnectionsCard;

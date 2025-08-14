import { Link } from 'react-router-dom';

const ConnectionsCard = ({ connection, button, id, reviewRequests }) => {
    const { firstName, lastName, about, gender, photoUrl, skills, age, _id } = connection;

    return (
        <div className="bg-base-300 shadow-xl rounded-xl overflow-hidden flex flex-col sm:flex-row">
            {/* Image */}
            <figure className="sm:w-48 sm:h-48 w-full h-full ">
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}
                    alt={`${firstName} ${lastName}`}
                    className="object-cover w-full h-full"
                />
            </figure>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                    {gender && <p className="text-sm text-gray-300"><strong>Gender:</strong> {gender}</p>}
                    {age && <p className="text-sm text-gray-300"><strong>Age:</strong> {age}</p>}
                    {about && <p className="text-sm text-gray-300 mt-1"><strong>About:</strong> {about}</p>}

                    {/* Skills */}
                    {skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="badge badge-secondary">{skill}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2 flex-wrap">
                    {button ? (
                        <>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => reviewRequests("accepted", id)}
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => reviewRequests("rejected", id)}
                            >
                                Reject
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={`/chat/${_id}`}>
                                <button className="btn btn-primary btn-sm">Chat</button>
                            </Link>
                            <button className="btn btn-secondary btn-sm">View Profile</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConnectionsCard;

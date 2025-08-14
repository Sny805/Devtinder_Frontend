import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utills/constants';
import axios from 'axios';
import { addRequests, removeRequest } from '../utills/requestsSlice';
import ConnectionsCard from './Cards/ConnectionsCard';
import { toast } from 'react-toastify';
import Loading from '../utills/Loading';
import NoData from '../utills/NoData';

const Requests = () => {

    const data = {
        heading: "No connection requests",
        description: "When someone wants to connect, you'll see their request here",
        svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
    }

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    const reviewRequests = async (status, id) => {
        try {
            const res = await axios.post(BASE_URL + "request/review/" + status + "/" + id, {}, { withCredentials: true })
            dispatch(removeRequest(id));
            toast.success(res?.data?.message)
        }
        catch (err) {
            console.error(err.message)
        }

    }


    const fetchRequests = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true });

            dispatch(addRequests(res.data.data))
        }
        catch (err) {
            console.error(err.message)
            setError("Unable to fetch connections requests")
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])




    if (isLoading) {
        return <Loading content="Loading Connections...." />
    }
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
    if (!requests || requests?.length <= 0) {
        return <NoData data={data} />
    }




    return (
        <>

            <div className="px-4 min-h-[78vh] px-4">
                <div className='flex justify-center mt-4'>
                    <h1 className='text-bold text-2xl'>Connections Requests</h1>

                </div>
                <div className='flex mt-10 gap-4  px-4'>
                    {
                        requests.map((connection) => (
                            <ConnectionsCard key={connection.fromUserId._id} reviewRequests={reviewRequests} id={connection._id} button={true} connection={connection.fromUserId
                            } />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Requests
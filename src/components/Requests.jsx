import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utills/constants';
import axios from 'axios';
import { addRequests, removeRequest } from '../utills/requestsSlice';
import ConnectionsCard from './Cards/ConnectionsCard';
import { toast } from 'react-toastify';

const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch()
    const [button] = useState(true)


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
            const res = await axios.get(BASE_URL + "user/requests/received", { withCredentials: true });
            console.log("fetch requestssss", res.data.data);
            dispatch(addRequests(res.data.data))
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return

    if (requests.length == 0)
        return <h1 >No Requests Found</h1>



    return (
        <>


            <div className='flex justify-center mt-4'>
                <h1 className='text-bold text-2xl'>Connections Requests</h1>

            </div>
            <div className='flex mt-10 gap-4 border px-4'>
                {
                    requests.map((connection) => (
                        <ConnectionsCard key={connection.fromUserId._id} reviewRequests={reviewRequests} id={connection._id} button={button} connection={connection.fromUserId
                        } />
                    ))
                }
            </div>
        </>
    )
}

export default Requests
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utills/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utills/connectionsSlice'
import ConnectionsCard from './Cards/ConnectionsCard'

const Connections = () => {

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch()


    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connections", { withCredentials: true });

            dispatch(addConnections(res.data.data))
        }
        catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) return

    if (connections.length == 0)
        return <h1>No Connections Found</h1>



    return (
        <>


            <div className='flex justify-center mt-4'>
                <h1 className='text-bold text-2xl'>Connections</h1>

            </div>
            <div className='flex mt-10 gap-4  px-4'>
                {
                    connections.map((connection) => (
                        <ConnectionsCard connection={connection} key={connection._id} />
                    ))
                }
            </div>
        </>

    )
}

export default Connections
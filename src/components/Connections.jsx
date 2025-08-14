
import Loading from '../utills/Loading'
import NoData from '../utills/NoData'
import ConnectionsCard from './Cards/ConnectionsCard'
import useFetchConnections from './hooks/useFetchConnections'

const Connections = () => {

    const { connections, isLoading, error } = useFetchConnections()


    const data = {
        heading: "No connections found",
        description: "Start connecting with people to see them her",
        svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    }


    if (isLoading) {
        return <Loading content="Loading Connections...." />
    }
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
    if (!connections || connections?.length <= 0) {
        return <NoData data={data} />
    }



    return (
        <>

            <div className="px-4 min-h-[78vh]">
                <div className="flex justify-center mt-4">
                    <h1 className="font-bold text-2xl">Connections</h1>
                </div>
                <div className="grid grid-cols-1 m-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                    {connections.map((connection) => (
                        <ConnectionsCard key={connection._id} connection={connection} />
                    ))}
                </div>
            </div>
        </>

    )
}

export default Connections
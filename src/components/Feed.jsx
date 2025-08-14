
import UserCard from './Cards/UserCard'

import Loading from '../utills/Loading'
import NoData from '../utills/NoData'
import useFetchFeed from './hooks/useFetchFeed'


const Feed = () => {


    const { feedData, isLoading, error } = useFetchFeed()

    const data = {
        heading: "No new users in your feed",
        description: "We're looking for more people to connect with. Check back soon!",
        svg: <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    }


    if (isLoading) {
        return <Loading content="Loading Feed...." />
    }
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
    if (!feedData || feedData?.length <= 0) {
        return <NoData data={data} />
    }


    return (
        feedData && (<div className='flex justify-center items-center mt-6  min-h-[80vh]'>
            <UserCard data={feedData[0]} isFeed={true} />

        </div>)



    )
}

export default Feed
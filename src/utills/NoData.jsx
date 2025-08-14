import React from 'react'

const NoData = ({ data }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            {data.svg}
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end bg-clip-text text-text-secondary">
                {data.heading}
            </h2>
            <p className="mt-2 text-text-secondary opacity-80 max-w-md">
                {data.description}
            </p>
        </div>
    );
}

export default NoData
import React from 'react'
import { Loader2 } from "lucide-react";

const Loading = ({ content }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[80vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-text-secondary font-medium">{content}</p>
        </div>
    );
}

export default Loading
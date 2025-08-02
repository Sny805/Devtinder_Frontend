import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0f2d] to-[#14142f] text-white flex flex-col items-center justify-center px-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-purple-400 mb-6">
                Welcome to <span className="text-blue-400">DevTinder</span>
            </h1>
            <p className="text-center text-lg text-gray-300 max-w-xl mb-10">
                Connect with fellow developers, collaborate on projects, and find your perfect coding partner! Join thousands of devs building the future together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">
                <div className="bg-[#1a1a3c] rounded-2xl p-6 text-center shadow-lg">
                    <h2 className="text-3xl font-semibold text-purple-300">1000+</h2>
                    <p className="text-gray-400 mt-2">Developers</p>
                </div>
                <div className="bg-[#1a1a3c] rounded-2xl p-6 text-center shadow-lg">
                    <h2 className="text-3xl font-semibold text-pink-400">500+</h2>
                    <p className="text-gray-400 mt-2">Matches</p>
                </div>
                <div className="bg-[#1a1a3c] rounded-2xl p-6 text-center shadow-lg">
                    <h2 className="text-3xl font-semibold text-green-400">250+</h2>
                    <p className="text-gray-400 mt-2">Projects</p>
                </div>
            </div>

            <div className="flex gap-4">
                <Link to="/signup">
                    <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full text-white text-lg">
                        Get Started
                    </button>
                </Link>
                <Link to="/login">
                    <button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-800 px-6 py-2 rounded-full text-lg">
                        Join Now
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default LandingPage;

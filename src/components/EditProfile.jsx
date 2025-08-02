import React, { useState } from 'react';
import UserCard from './Cards/UserCard';
import axios from 'axios';
import { BASE_URL } from '../utills/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utills/userSlice';
import { toast } from 'react-toastify';


export const EditProfile = ({ user }) => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        about: user.about || '',
        age: user.age || '',
        gender: user.gender || '',
        photoUrl: user.photoUrl || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const updateProfile = async () => {
        try {
            if (!data.firstName || !data.lastName || !data.age || !data.gender) {
                toast.warn("Please fill all required fields");
                return;
            }

            const res = await axios.patch(BASE_URL + 'profile/edit', data, {
                withCredentials: true,
            });

            dispatch(addUser(res?.data?.data));
            toast.success('Profile updated successfully!');
        } catch (err) {
            console.error(err.message);
            toast.error('Something went wrong while updating profile.');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-start  gap-8 my-10">
            {/* Edit Form */}
            <div className="card bg-base-200 w-full max-w-md shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-xl justify-center mb-4">Edit Profile</h2>

                    {/* First Name */}
                    <label className="form-control w-full">
                        <span className="label-text mb-1">First Name *</span>
                        <input
                            type="text"
                            name="firstName"
                            className="input input-bordered w-full"
                            placeholder="Enter your first name"
                            value={data.firstName}
                            onChange={handleChange}
                        />
                    </label>

                    {/* Last Name */}
                    <label className="form-control w-full mt-3">
                        <span className="label-text mb-1">Last Name *</span>
                        <input
                            type="text"
                            name="lastName"
                            className="input input-bordered w-full"
                            placeholder="Enter your last name"
                            value={data.lastName}
                            onChange={handleChange}
                        />
                    </label>

                    {/* Photo URL */}
                    <label className="form-control w-full mt-3">
                        <span className="label-text mb-1">Photo URL</span>
                        <input
                            type="text"
                            name="photoUrl"
                            className="input input-bordered w-full"
                            placeholder="Enter photo URL"
                            value={data.photoUrl}
                            onChange={handleChange}
                        />
                    </label>

                    {/* Age */}
                    <label className="form-control w-full mt-3">
                        <span className="label-text mb-1">Age *</span>
                        <input
                            type="number"
                            name="age"
                            className="input input-bordered w-full"
                            placeholder="Enter your age"
                            value={data.age}
                            onChange={handleChange}
                            min="0"
                        />
                    </label>

                    {/* Gender */}
                    <label className="form-control w-full mt-3">
                        <span className="label-text mb-1">Gender *</span>
                        <select
                            name="gender"
                            className="select select-bordered w-full"
                            value={data.gender}
                            onChange={handleChange}
                        >
                            <option disabled value="">Select gender</option>
                            <option>male</option>
                            <option>female</option>
                            <option>other</option>
                        </select>
                    </label>

                    {/* About */}
                    <label className="form-control w-full mt-3">
                        <span className="label-text mb-1">About</span>
                        <textarea
                            name="about"
                            className="textarea textarea-bordered w-full"
                            placeholder="Say something about yourself"
                            value={data.about}
                            onChange={handleChange}
                            rows={3}
                        />
                    </label>

                    {/* Save Button */}
                    <div className="card-actions justify-center mt-6">
                        <button
                            className="btn btn-primary gap-2 px-6"
                            onClick={updateProfile}
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Preview */}
            <div className="hidden lg:block">
                <UserCard data={data} />
            </div>
        </div>
    );
};

import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utills/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utills/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateInputs } from '../utills/inputValition';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const isSignUp = currentPath == "/signup"


    // const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        emailId: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState({});

    const toggleMode = () => {
        navigate(isSignUp ? "/login" : "/signup");
        setData({ emailId: '', password: '', firstName: '', lastName: '' });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };



    const handleSubmit = async () => {
        if (!validateInputs(data, isSignUp, setErrors)) return;
        setLoading(true);

        try {
            if (isSignUp) {
                const res = await axios.post(`${BASE_URL}signup`, data, { withCredentials: true });
                toast.success(res.data.message || 'Signup Successful', { autoClose: 3000 });
                navigate("/login")
            } else {
                const res = await axios.post(`${BASE_URL}login`, data, { withCredentials: true });
                dispatch(addUser(res.data.user));
                navigate('/feed');
                toast.success(res.data.message || 'Login Successful', {
                    autoClose: 3000,
                });
            }
        } catch (err) {
            toast.error(err.response?.data?.error || 'Something went wrong', { autoClose: 3000 });
            setLoading(false);
        }

        finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-900 flex justify-center items-center px-4'>
            <div className='bg-base-100 rounded-lg shadow-2xl flex w-full max-w-4xl overflow-hidden'>

                {/* Left Panel */}
                <div className='bg-gray-900 text-white p-8 w-1/2 hidden md:flex flex-col justify-center'>
                    <h2 className='text-4xl font-bold text-purple-500 mb-4'>DevTinder</h2>
                    <p className='text-sm text-gray-300'>
                        {isSignUp
                            ? "Join the community where developers meet, collaborate, and build amazing things together."
                            : "Where developers meet, collaborate, and build amazing things together. Find your perfect coding partner today!"
                        }
                    </p>
                    <div className='mt-6 space-y-2 text-sm text-gray-400'>
                        <p>🚀 Match with skilled developers</p>
                        <p>💬 Collaborate on real-time projects</p>
                        <p>⚡ Start your dev journey now</p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className='p-8 w-full md:w-1/2'>
                    <h2 className='text-center text-2xl font-semibold mb-6'>
                        {isSignUp ? 'Join DevTinder!' : 'Welcome Back!'}
                    </h2>

                    <form className='space-y-4' onSubmit={e => e.preventDefault()}>
                        {isSignUp && (
                            <>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className='input input-bordered w-full'
                                    value={data.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className='input input-bordered w-full'
                                    value={data.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
                            </>
                        )}

                        <input
                            type="email"
                            name="emailId"
                            placeholder="Email"
                            className='input input-bordered w-full'
                            value={data.emailId}
                            onChange={handleChange}
                        />
                        {errors.emailId && <p className='text-red-500 text-sm'>{errors.emailId}</p>}

                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className='input input-bordered w-full pr-10'
                                value={data.password}
                                onChange={handleChange}
                            />
                            <span
                                className='absolute right-3 top-3.5 cursor-pointer text-gray-500'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

                        <button
                            className='btn btn-primary w-full'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className='loading loading-spinner loading-sm'></span>
                            ) : (
                                isSignUp ? 'Create Account' : 'Login'
                            )}
                        </button>
                    </form>

                    <p className='text-center mt-4 text-sm text-gray-600'>
                        {isSignUp ? (
                            <>
                                Already a member?{' '}
                                <span className='text-blue-500 cursor-pointer' onClick={toggleMode}>
                                    Login here
                                </span>
                            </>
                        ) : (
                            <>
                                Don’t have an account?{' '}
                                <span className='text-blue-500 cursor-pointer' onClick={toggleMode}>
                                    Sign up now
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;

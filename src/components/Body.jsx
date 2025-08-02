import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utills/constants'
import { addUser } from '../utills/userSlice'

export const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user)

    const fetchUser = async () => {
        // if (userData) return
        try {
            const res = await axios.get(BASE_URL + "profile/view", { withCredentials: true })
            dispatch(addUser(res.data));
        }
        catch (err) {
            if (err.status == 401) {
                const protectedPaths = ["/home", "/profile", "/connections", "/requests"];
                if (protectedPaths.includes(location.pathname)) {
                    navigate("/login");
                }


            }
            console.error(err);
        }

    }

    useEffect(() => {
        if (!userData)
            fetchUser();
    }, [])


    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

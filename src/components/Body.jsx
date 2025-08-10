import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utills/constants'
import { addUser } from '../utills/userSlice'

export const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [authChecked, setAuthChecked] = useState(false)
    const userData = useSelector((store) => store.user)



    const publicOnlyRoutes = ["/", "/login", "/signup"]

    const fetchUser = async () => {
        // if (userData) return
        try {
            const res = await axios.get(BASE_URL + "profile/view", { withCredentials: true })
            dispatch(addUser(res.data));
            setAuthChecked(true)
        }
        catch (err) {
            if (err.status == 401) {
                dispatch(addUser(null))
            }
            setAuthChecked(true)
            console.error(err);
        }

    }

    useEffect(() => {
        if (!userData)
            fetchUser();
    }, [])

    useEffect(() => {


        if (!authChecked) return

        if (userData && userData._id) {
            // Redirect away from public-only routes
            if (publicOnlyRoutes.includes(location.pathname)) {
                navigate("/feed")
            }
        }
        // User is NOT logged in
        else {

            if (!publicOnlyRoutes.includes(location.pathname)) {
                navigate("/login")
            }
        }
    }, [location.pathname, userData, authChecked, navigate])


    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

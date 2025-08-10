import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utills/constants';
import { removeUser } from '../utills/userSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname == "/login" || location.pathname == "/signup") {
        return null
    }

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
            dispatch(removeUser());
            toast.success(res.data.message || "Logout Successful");
            setTimeout(() => {
                navigate("/");
            }, 0);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="navbar bg-base-300 px-4">
            <div className="flex-1">
                <Link to={user ? "/feed" : "/"} className="btn btn-ghost text-xl">DevTinder</Link>
            </div>

            {user ? (
                <div className="flex-none gap-2">
                    <div className="form-control hidden sm:block">Welcome, {user.firstName}</div>
                    <div className="dropdown dropdown-end mx-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={user.photoUrl || "https://via.placeholder.com/40"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">Profile</Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><Link to="/premium">Premium</Link></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                    <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;

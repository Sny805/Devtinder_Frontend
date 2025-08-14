import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utills/constants';
import { removeUser } from '../utills/userSlice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { addFeed } from '../utills/feedSlice';

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + 'logout', {}, { withCredentials: true });
            dispatch(removeUser());
            dispatch(addFeed(null));
            toast.success(res.data.message || 'Logout Successful');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const navLinks = [
        { to: '/feed', label: 'Home' },
        { to: '/profile', label: 'Profile' },
        { to: '/connections', label: 'Connections' },
        { to: '/requests', label: 'Requests' },
        !user?.isPremium && { to: '/premium', label: 'Premium' },

    ].filter(Boolean);

    return (
        <nav className="navbar bg-base-300 px-4 flex justify-between items-center relative">
            {/* Logo */}
            <Link to={user ? '/feed' : '/'} className="btn btn-ghost text-xl">
                DevTinder
            </Link>

            {/* Desktop Menu */}
            {user && (
                <div className="hidden md:flex space-x-6">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            className="text-text-primary hover:text-primary transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            {/* Desktop User Menu */}
            {user ? (
                <>
                    <div className="hidden md:flex items-center gap-4">
                        <span className="hidden sm:block">Welcome, {user.firstName}</span>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={user.photoUrl || 'https://via.placeholder.com/40'}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="text-center menu menu-sm dropdown-content bg-base-200 rounded-box z-[100] mt-3 w-52 p-2 shadow"
                            >
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>


                    </div>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={toggleMobileMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    isMobileMenuOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16M4 18h16'
                                }
                            />
                        </svg>
                    </button>
                </>
            ) : (
                !isAuthPage && (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-outline btn-sm">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-primary btn-sm">
                            Sign Up
                        </Link>
                    </div>
                )
            )}

            {/* Mobile Dropdown */}
            {user && isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-base-300 shadow-md md:hidden z-50 flex flex-col items-start ml-4">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            className="block px-4 py-2 text-text-primary hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between mx-4 px-4 py-2 border-t border-primary w-[93%]">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary mr-2">
                                <img
                                    src={user.photoUrl}
                                    alt="User"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span>Welcome, {user.firstName}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-primary hover:text-primary-focus"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

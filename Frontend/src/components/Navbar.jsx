import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/media"}>Media</NavLink>
              </li>
              <li>
                <NavLink to={"/messages"}>Messages</NavLink>
              </li>
              <li>
                <NavLink to={"about"}>About</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Sign Up</NavLink>
              </li>
            </ul>
          </div>
          <a className="md:text-3xl font-semibold ml-8">PostHub</a>
        </div>
        <div className="navbar-end hidden lg:flex mx-10">
          <ul className="menu menu-horizontal px-1 font-semibold">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/media"}>Media</NavLink>
            </li>
            <li>
              <NavLink to={"/messages"}>Messages</NavLink>
            </li>
            <li>
              <NavLink to={"about"}>About</NavLink>
            </li>
            <li>
              {user ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <img
                      referrerPolicy="true"
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co.com/t3LvgVM/admission-banner-removebg-preview.png"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-yellow-500"
                    />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-6 mt-24  border bg-lime-200 text-black shadow-lg rounded-md w-40 z-30">
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/register" activeClassName="text-yellow-500">
                  Sign Up
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

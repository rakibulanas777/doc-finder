// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import logo2 from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import PrimaryButton from "./shared/PrimaryButton";
import OutlineButton from "./shared/OutlineButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../context/userContext";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [active, setActive] = useState(0);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const { user } = useSelector((state) => state.user);
  console.log(user);
  const navItem = [
    {
      name: "Home",
      id: 0,
      path: "/",
    },
    {
      name: "Appointment",
      id: 1,
      path: "/appointment",
    },
    {
      name: "Apply Doctor",
      id: 4,
      path: "/applydoctor",
    },

    {
      name: "Profile",
      id: 3,
      path: `/profile`,
    },
  ];
  const navItemDoctor = [
    {
      name: "Home",
      id: 0,
      path: "/",
    },
    {
      name: "Appointment",
      id: 1,
      path: "/appointment",
    },

    {
      name: "Profile",
      id: 3,
      path: `/doctor/profile/${user?.user?._id}`,
    },
  ];
  const navItemAdmin = [
    {
      name: "Home",
      id: 0,
      path: "/",
    },
    {
      name: "Doctor",
      id: 4,
      path: "/admin/doctors",
    },
    {
      name: "Users",
      id: 2,
      path: "/admin/users",
    },
    {
      name: "Profile",
      id: 3,
      path: "/profile",
    },
  ];

  return (
    <div className="nav fixed top-0 left-0 w-full z-10 ease-in duration-300 shadow-sm backdrop-blur-md bg-white/80">
      <div className="container mx-auto py-6 px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <img
              src={logo}
              alt=""
              className="logo cursor-pointer hidden sm:inline-block"
            />
            <img
              src={logo2}
              alt=""
              className="logo cursor-pointer sm:hidden "
            />
          </NavLink>

          <div className=" lg:items-center lg:space-x-8 hidden lg:flex">
            {user ? (
              <>
                {user.user.isAdmin
                  ? navItemAdmin.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setActive(item.id)}
                        className={
                          active === item.id
                            ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                            : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))
                  : user.user.isDoctor
                  ? navItemDoctor.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setActive(item.id)}
                        className={
                          active === item.id
                            ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                            : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))
                  : navItem.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setActive(item.id)}
                        className={
                          active === item.id
                            ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                            : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full bg-blue-500 relative">
                      <div className="text-xl font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                        {user.user.name.charAt(0)}
                      </div>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">Profile</a>
                    </li>
                    <li>
                      <a
                        className="justify-between"
                        onClick={() => {
                          toast.success("Logout Successfully");
                          localStorage.clear();
                          location.reload();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>

                <NavLink to="/notification">
                  <div className="indicator">
                    <span className="indicator-item badge badge-secondary">
                      {user.user.notification.length}
                    </span>
                    <button className="btn">notification</button>
                  </div>
                </NavLink>
              </>
            ) : (
              <div className="flex space-x-4">
                <NavLink to="/login">
                  <OutlineButton>login</OutlineButton>
                </NavLink>
                <NavLink to="/register">
                  <PrimaryButton>Register</PrimaryButton>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div onClick={handleNav} className="block lg:hidden z-10">
            {nav ? (
              <AiOutlineCloseCircle
                className="text-primary cursor-pointer"
                size={26}
              />
            ) : (
              <HiMenu size={26} className="text-primary cursor-pointer" />
            )}
          </div>

          <div
            className={`lg:hidden  absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-bold ease-in  shadow-sm backdrop-blur-md bg-white/80 top-0 duration-500
      ${nav ? "right-0" : "right-[-100%]"} pt-16 `}
          >
            <div className="flex flex-col space-y-8">
              {user ? (
                <>
                  {user.user.isAdmin
                    ? navItemAdmin.map((item) => (
                        <NavLink
                          key={item.id}
                          to={item.path}
                          onClick={() => setActive(item.id)}
                          className={
                            active === item.id
                              ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                              : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))
                    : navItem.map((item) => (
                        <NavLink
                          key={item.id}
                          to={item.path}
                          onClick={() => setActive(item.id)}
                          className={
                            active === item.id
                              ? "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-primary"
                              : "cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral hover:text-primary"
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                  <NavLink to="/profile">
                    <div className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral">
                      {user.user.name}
                    </div>
                  </NavLink>

                  <NavLink to="/notification">
                    <div className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral">
                      notification
                    </div>
                  </NavLink>

                  <div>
                    <a
                      className="cursor-pointer duration-1000 ease-out text-sm lg:text-base xl:text-base font-medium text-neutral"
                      onClick={() => {
                        toast.success("Logout Successfully");
                        localStorage.clear();
                        location.reload();
                      }}
                    >
                      Logout
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex space-x-4">
                  <NavLink to="/login">
                    <OutlineButton>login</OutlineButton>
                  </NavLink>
                  <NavLink to="/register">
                    <PrimaryButton>Register</PrimaryButton>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";
import "./register.css";
// import { useUserContext } from "../context/userContext";
const Register = () => {
  const navigate = useNavigate();
  // const { getUser } = useUserContext();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfrim = form.confrimPassword.value;
    const userData = { name, email, password, passwordConfrim };

    fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          toast.success(data.message);

          form.reset();
          // getUser(data);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      });
  };
  return (
    <div className="register">
      <div className="w-full mx-auto pt-[20vh]">
        <form
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
          onSubmit={handleOnSubmit}
        >
          <NavLink to="/">
            <img
              src={logo}
              alt=""
              className="logo cursor-pointer mb-4 mx-auto"
            />
          </NavLink>
          <div className="mb-3">
            <label className="block text-gray-900 text-sm  mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              id="name"
              type="text"
              placeholder="name"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-900 text-sm  mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="email"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-3">
              <label
                className="block text-gray-900 text-sm  mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-900 text-sm  mb-2"
                htmlFor="confrimPassword"
              >
                Confrim Password
              </label>
              <input
                className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confrimPassword"
                name="confrimPassword"
                type="password"
                placeholder="******************"
              />
            </div>
          </div>

          <button
            className="bg-gradient-to-r lowercase from-secondary mb-3 to-primary btn glass text-white hover:!bg-secondary w-full rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            create an account
          </button>
          <Link
            to="/login"
            className="text-primary text-center font-semibold w-full  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Already account?
          </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;

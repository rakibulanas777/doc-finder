// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./login.css";
const Login = () => {
	return (
		<div className="login">
			<div className="w-full max-w-xs mx-auto py-24 h-screen">
				<form className="ease-in duration-300 shadow-sm backdrop-blur-md bg-white/80 absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-md px-8 pt-6 pb-8 mb-4">
					<NavLink to="/">
						<img src={logo} alt="" className="logo cursor-pointer mb-6" />
					</NavLink>

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm  mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							name="email"
							type="text"
							placeholder="Email"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm  mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							name="password"
							type="password"
							placeholder="******************"
						/>
					</div>

					<button
						className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary w-full rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign In
					</button>

					<Link
						to="/register"
						className="text-primary text-center font-semibold w-full  mb-3  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						create an account
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;

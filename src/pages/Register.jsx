// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./register.css";
const Register = () => {
	return (
		<div className="register relative">
			<div className="w-full mx-auto py-24">
				<form className="ease-in duration-300 shadow-sm backdrop-blur-md bg-white/80 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 rounded-md px-8 pt-8 pb-8 mb-4">
					<NavLink to="/">
						<img
							src={logo}
							alt=""
							className="logo cursor-pointer mb-6 mx-auto"
						/>
					</NavLink>
					<div className="mb-4">
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
					<div className="mb-4">
						<label
							className="block text-gray-900 text-sm  mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="text"
							name="email"
							placeholder="email"
						/>
					</div>
					<div className="flex flex-col md:flex-row md:space-x-4">
						<div className="mb-4">
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
						<div className="mb-4">
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

					<Link
						to="/login"
						className="text-primary text-center font-semibold w-full  mb-3  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Already account?
					</Link>
					<button
						className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary w-full rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						create an account
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;

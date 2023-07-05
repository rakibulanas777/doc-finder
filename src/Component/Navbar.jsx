// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import logo2 from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import PrimaryButton from "./shared/PrimaryButton";
import OutlineButton from "./shared/OutlineButton";
const Navbar = () => {
	const [active, setActive] = useState(0);
	const [nav, setNav] = useState(false);
	const handleNav = () => {
		setNav(!nav);
	};
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
			name: "About",
			id: 2,
			path: "/about",
		},
		{
			name: "Contact",
			id: 3,
			path: "/contact",
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
						{navItem.map((item) => (
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
						<div className="flex space-x-4">
							<NavLink to="/login">
								<OutlineButton>login</OutlineButton>
							</NavLink>
							<NavLink to="/register">
								<PrimaryButton>Register</PrimaryButton>
							</NavLink>
						</div>
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
							{navItem.map((item) => (
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

							<NavLink to="/login">
								<OutlineButton>login</OutlineButton>
							</NavLink>
							<NavLink to="/register">
								<PrimaryButton>Register</PrimaryButton>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;

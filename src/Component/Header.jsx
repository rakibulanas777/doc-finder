// eslint-disable-next-line no-unused-vars
import React from "react";
import PrimaryButton from "./shared/PrimaryButton";
import video from "../assets/video.png";
import banner from "../assets/headerbanner.png";
import "./header.css";
const Header = () => {
	return (
		<div className="header relative">
			<div className="container mx-auto my-auto py-36 lg:py-32 px-10 sm:px-8 md:px-6 lg:px-10">
				<div className="grid grid-cols-1 mx-auto lg:grid-cols-2 gap-8 items-center">
					<div className="left-part flex flex-col space-y-6">
						<div className="text-2xl md:text-3xl lg:text-4xl font-medium">
							Providing Quality <span className="text-sky-800">Healthcare</span>{" "}
							for a <span className="text-lime-700">Brighter </span>
							and <span className="text-lime-700">Healthy </span> Future
						</div>
						<div className="text-md md:text-base lg:text-xl pb-5">
							At our hospital, we are dedicated to providing exceptional medical
							care to our patients and their families. Our experienced team of
							medical professionals, cutting-edge technology, and compassionate
							approach make us a leader in the healthcare industry
						</div>

						<div className="flex items-center space-x-10">
							<PrimaryButton>appointments</PrimaryButton>
							<div className="flex items-center cursor-pointer space-x-3">
								<img src={video} alt="" className="cursor-pointer" />
								<div className="text-xl hidden sm:block font-medium">watch video</div>
							</div>
						</div>
					</div>
					<div className="right-part mx-auto py-4">
						<img src={banner} alt="" className="cursor-pointer h-96 lg:h-[27rem]" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;

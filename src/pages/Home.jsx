/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import doctor from "../assets/doctor.png";
import axios from "axios";
import { Row } from "antd";
import DoctorList from "./DoctorList";
import PrimaryButton from "../Component/shared/PrimaryButton";
const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/getAllDoctors",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  console.log(doctors);
  return (
    <div className="home">
      <Header />
      <div className="container mx-auto py-24 px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="flex items-center justify-between text-black  pb-8">
          <select className="select w-full max-w-xs border bg-white">
            <option selected>All</option>
            <option>chicken</option>
            <option>foods</option>
            <option>rice</option>
            <option>ice-cream</option>
            <option>Maggie</option>
          </select>
          <button className="flex bg-white py-2 px-3 gap-2 items-center rounded-sm font-medium border-white">
            <span className=" font-medium">sort</span>
            {/* {sort ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />} */}
          </button>
        </div>
        
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
          {doctors.map((doctor) => (
            <DoctorList doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

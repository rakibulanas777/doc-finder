/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import doctor from "../assets/doctor.png";
import axios from "axios";
import { Row } from "antd";
import DoctorList from "./DoctorList";
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

        <Row>
          {doctors.map((doctor) => (
            <DoctorList doctor={doctor} />
          ))}
        </Row>
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 ">
          <div className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border p-3">
            <div className="relative">
              <Link to="/">
                <img src={doctor} className="h-40" />
              </Link>

              <div className="absolute top-2 right-2">
                <div className="shadow-sm text-white bg-primary   cursor-pointer p-5  rounded-full  relative">
                  <AiOutlinePlus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                </div>
              </div>
            </div>
            <div className="card-data pt-3">
              <div className="flex items-center flex-col space-y-2 text-black justify-between">
                <div className="font-medium  cursor-pointer">Dr.Anas islam</div>
                <div className="font-medium text-primary cursor-pointer">
                  fees $789
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

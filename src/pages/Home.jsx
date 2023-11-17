/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlinePlus,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import doctor from "../assets/doctor.png";
import axios from "axios";
import { Row } from "antd";
import DoctorList from "./DoctorList";
import PrimaryButton from "../Component/shared/PrimaryButton";
const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [value, getValue] = useState("all");
  const [sort, setSort] = useState([]);
  const handleSelect = (e) => {
    getValue(e.target.value?.toLowerCase());
  };
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/getAllDoctors",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        if (value === "all") {
          const doc = res.data.data;
          setDoctors(doc);
        } else {
          const doc = res.data.data;
          const match = doc.filter(
            (Doctor) => Doctor.specialization.toLowerCase() === value
          );
          setDoctors(match);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [value]);

  console.log(value);

  // const matched = foods.filter((Food) =>
  //   Food.catagory.toLowerCase().includes(search)
  // );
  return (
    <div className="home">
      <Header />
      <div className="container mx-auto py-24 px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="flex items-center justify-between text-black  pb-8">
          <select
            className="select w-full max-w-xs border bg-white"
            onChange={handleSelect}
          >
            <option selected>All</option>
            <option>General Physician</option>
            <option>Dermatology</option>
          </select>
          <button className="flex bg-white py-2 px-3 gap-2 items-center rounded-sm font-medium border-white">
            <span className=" font-medium">sort</span>
            {sort ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </button>
        </div>

        <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 ">
          {doctors.map((doctor) => (
            <DoctorList doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

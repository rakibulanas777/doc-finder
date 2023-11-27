import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../Component/shared/PrimaryButton";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {/* <div className="backdrop-blur-md bg-white/80 shadow-md p-3 rounded-md flex items-center">
        <img className="h-48 mx-auto px-3 border-r" src={doctor.image} />

        <div className="flex flex-col space-y-2 pr-4 ">
          <h3 className="text-gray-900 text-xl font-bold tracking-tight">
            Dr. {doctor.name}
          </h3>
          <hr />
          <div className="flex items-center justify-between">
            <div className="text-gray-900 cursor-pointer font-semibold">
              {doctor.specialization}
            </div>
            <span className=" font-bold text-primary">
              ${doctor.feesPerConsaltation}
            </span>
          </div>
          <p>
            <b>Timings : </b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
          {
            user ? (<button
              className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary"
              onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
            >
              booking
            </button>) : (<button
              className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary"
              onClick={() => navigate(`/login`)}
            >
              booking
            </button>)
          }

        </div>
      </div> */}

      <div className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  border p-3">
        <div className="relative mb-3">
          <Link to={`/doctor/book-appointment/${doctor._id}`}>
            <img src={doctor.image} className=" cursor-pointer" />
          </Link>
          <div className="absolute top-2 right-2">
            <button className="shadow-sm text-white bg-green-500 hover:bg-green-700  cursor-pointer p-5  rounded-full  relative">
              <FaHeart className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
            </button>
          </div>
        </div>
        <div className="card-data text-black text-xl">
          <p className=" font-semibold text-black">Dr. {doctor?.name}</p>


          <div className="flex items-center text-black justify-between">
            <div className=""> {doctor?.specialization}</div>
            <div className="font-medium text-green-600 cursor-pointer"> ${doctor?.feesPerConsaltation}</div>
          </div>
          <div className="flex items-center  justify-between mt-2">
            <div className="font-medium"> <b>Timings : </b> {doctor.timings[0]} - {doctor.timings[1]}</div>
            {/* <Link to={`/allbids/${curElem._id}`}> */}
            {
              user ? (<button
                className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary"
                onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
              >
                booking
              </button>) : (<button
                className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary"
                onClick={() => navigate(`/login`)}
              >
                booking
              </button>)
            }

            {/* </Link> */}
          </div>

        </div>
      </div>
    </>
  );
};

export default DoctorList;

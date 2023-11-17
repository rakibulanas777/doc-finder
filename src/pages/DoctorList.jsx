import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../Component/shared/PrimaryButton";
import { useSelector } from "react-redux";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="backdrop-blur-md bg-white/80 shadow-md p-3 rounded-md flex items-center">
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
      </div>
    </>
  );
};

export default DoctorList;

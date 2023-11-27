import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import logo from "../assets/logo.svg";
import "../pages/login.css";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useStripe } from "@stripe/react-stripe-js";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
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


  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/booking-availbility",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const stripe = useStripe();
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user.user._id,
          doctorInfo: doctors,
          userInfo: user.user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      const result = await stripe.redirectToCheckout({
        sessionId: res.data.id,
      });
      if (result.error) {
        console.error(result.error.message);
      }
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


  console.log(doctors)



  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="bookingpage">
        <div className="container mx-auto">
          <div className="ease-in duration-300 w-[80%] sm:w-[60%] absolute top-[55%] left-[50%] -translate-x-[50%] -translate-y-[50%] shadow-sm backdrop-blur-md bg-white/80 lg:w-[30%] mx-auto rounded-md px-8 py-5">
            <NavLink to="/">
              <img
                src={logo}
                alt=""
                className="logo mx-auto cursor-pointer mb-6"
              />
            </NavLink>
            {doctors && (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="font-semibold text-xl">Dr.{doctors.name}</h2>
                <h4 className="font-semibold">
                  Fees :{" "}
                  <b className="text-primary">${doctors.feesPerConsaltation}</b>
                </h4>
                <h4>
                  Timings : {doctors.timings && doctors.timings[0]} -{" "}
                  {doctors.timings && doctors.timings[1]}{" "}
                </h4>
                <div className="flex flex-column space-x-6 w-50">
                  <DatePicker
                    className="m-2"
                    format="DD-MM-YYYY"
                    onChange={(value) => {
                      // Using moment.js to format the date
                      const formattedDate = moment(value.$d).format("DD-MM-YYYY");

                      setDate(formattedDate);
                    }}
                  />
                  <TimePicker
                    format="HH:mm"
                    className="m-2"
                    onChange={(value) => {
                      console.log(value)
                      setTime(moment(value.$d).format("HH:mm"));
                    }}
                  />
                </div>
                <button
                  className="btn btn-primary text-white w-full"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <button
                  className="bg-gradient-to-r lowercase from-secondary to-primary btn glass text-white hover:!bg-secondary w-full rounded focus:outline-none focus:shadow-outline"
                  onClick={handleBooking}
                  type="submit"
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
import { FaStar } from "react-icons/fa";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://doc-finder.onrender.com/api/v1/user/user-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const [appoinmentInfo, getAppointmentInfo] = useState([])

  const handleFrom = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;


    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/addreviews",
        {
          doctorId: appoinmentInfo.doctorId,
          userId: appoinmentInfo.userInfo,
          rating: currentValue,
          comment
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(appoinmentInfo)
  const handleReview = async (record) => {
    document.getElementById('my_modal_3').showModal()
    getAppointmentInfo(record)


  }

  console.log(appoinmentInfo)
  const columns = [
    {
      title: "Name",
      dataIndex: "_id",
      render: (text, record) => (
        <span>
          {record.doctorInfo.name}
        </span>)
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Review",
      dataIndex: "review",
      render: (text, record) => (
        <button
          className="btn btn-success text-white"
          onClick={() => handleReview(record)}
        >
          add review
        </button>
      ),
    },
  ];

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  console.log(currentValue)
  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }


  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

  };


  return (
    <>
      <div className="container mx-auto  px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="w-full mx-auto pt-[20vh]">
          <h1>Appoinmtnets Lists</h1>
          <Table columns={columns} dataSource={appointments} />
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <form onSubmit={handleFrom}>


                <div className="flex items-center space-y-3 flex-col">
                  <div className="flex gap-3 justify-center">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          size={24}
                          className=" cursor-pointer"
                          onClick={() => handleClick(index + 1)}
                          onMouseOver={() => handleMouseOver(index + 1)}
                          onMouseLeave={handleMouseLeave}
                          color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}

                        />
                      )
                    })}
                  </div>
                  <textarea className="textarea textarea-bordered" placeholder="Enter you expreience" name="comment" ></textarea>

                  <button
                    className="btn btn-success btn-sm text-white"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>

            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default Appointments;

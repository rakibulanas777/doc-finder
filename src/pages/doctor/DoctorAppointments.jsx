import React, { useState, useEffect } from "react";

import axios from "axios";

import moment from "moment";
import { message, Table, Tag } from "antd";
import { useSelector } from "react-redux";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://doc-finder.onrender.com/api/v1/doctor/doctor-appointments?status=all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data)
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useSelector((state) => state.user);

  const getApprovedAppointments = async () => {
    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/doctor/approved-appointments",
        {
          id: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data)

      }
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    getAppointments();
    getApprovedAppointments()
  }, [appointments]);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "_id",
      render: (text, record) => (
        <span>
          {record.userId.name}
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
      title: "Paid",
      dataIndex: "paid",
      render: (text, record) => (
        <>
          {record.paid === false ? (
            <Tag color="volcano">unpaid</Tag>
          ) : (
            <Tag color="green">paid</Tag>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <>
          {record.status === "reject" ? (
            <Tag color="volcano">{record.status}</Tag>
          ) : (
            <Tag color="green">{record.status}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="flex">
              <button
                className="btn btn-success text-white"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-error text-white ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="container mx-auto  px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="w-full mx-auto pt-[20vh]">
          <h1 className="text-2xl font-semibold mx-auto text-center mb-5">
            Appoinmtnets Lists
          </h1>
          <Table columns={columns} dataSource={appointments} />
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;

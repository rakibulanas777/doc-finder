import React, { useState, useEffect } from "react";

import axios from "axios";

import moment from "moment";
import { message, Table, Tag } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/doctor/doctor-appointments",
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/doctor/update-status",
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
      title: "ID",
      dataIndex: "_id",
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
          <h1 className="text-2xl font-semibold mx-auto text-center mb-5">Appoinmtnets Lists</h1>
          <Table columns={columns} dataSource={appointments} />
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;

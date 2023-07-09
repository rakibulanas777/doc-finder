import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "https://doc-finder.onrender.com/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.name}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <>
          {record.status === "pending" ? (
            <Tag color="volcano">{record.status}</Tag>
          ) : (
            <Tag color="green">{record.status}</Tag>
          )}
        </>
      ),
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success text-white"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-error text-white">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="container mx-auto  px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="w-full mx-auto pt-[20vh]">
          <h1 className="text-center mb-8 text-2xl font-medium">All Doctors</h1>

          <Table columns={columns} dataSource={doctors} />
        </div>
      </div>
    </>
  );
};

export default Doctors;

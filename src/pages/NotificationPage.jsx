import React from "react";

import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };

  return (
    <>
      <div className="container mx-auto my-auto py-36 lg:py-32 px-10 sm:px-8 md:px-6 lg:px-10">
        <h4 className="p-3 text-center text-2xl font-semibold">
          Notification Page
        </h4>
        <Tabs>
          <Tabs.TabPane tab="unread" key={0}>
            <div className="flex flex-col space-y-4">
              {user?.user.notification?.map((notificationMgs) => (
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="avatar hidden md:block">
                      <div className="mask mask-squircle  h-16 cursor-pointer">
                        <img
                          src={notificationMgs.data?.doctor.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {notificationMgs.data?.doctor.name}
                      </div>
                      <div className="text-sm opacity-50">
                        {notificationMgs.data?.doctor.specialization}
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-text">
                        {" "}
                        <b>{notificationMgs.data?.doctor.name}</b>{" "}
                        {notificationMgs.message}
                      </div>
                    </div>
                  </div>
                  <button className="btn" onClick={handleMarkAllRead}>
                    Mark All Read
                  </button>
                </div>
              ))}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="flex flex-col space-y-4">
              {user?.user.seenNotification?.map((notificationMgs) => (
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="avatar hidden md:block">
                      <div className="mask mask-squircle  h-16 cursor-pointer">
                        <img
                          src={notificationMgs.data?.doctor.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="font-bold">
                        {notificationMgs.data?.doctor.name}
                      </div>
                      <div className="text-sm opacity-50">
                        {notificationMgs.data?.doctor.specialization}
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-text">
                        <b>{notificationMgs.data?.doctor.name}</b>{" "}
                        {notificationMgs.message}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-error text-white font-semibold"
                    onClick={handleDeleteAllRead}
                  >
                    Delete All Read
                  </button>
                </div>
              ))}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default NotificationPage;

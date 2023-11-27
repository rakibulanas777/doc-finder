import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import logo from "../assets/logo.svg";
import "./applydoctor.css";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from "moment";

const ProfileUser = () => {
  const { user } = useSelector((state) => state.user);
  const [User, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/updateUserProfile",
        {
          ...values,
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
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  //getDOc Details
  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/getUserInfoController",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(User)
  useEffect(() => {
    getUserInfo();
    //eslint-disable-next-line
  }, [User]);
  return (
    <>
      <div className="container mx-auto  px-10 sm:px-8 md:px-6 lg:px-10">
        <div className="w-full mx-auto pt-[20vh]">
          {User && (
            <Form
              layout="vertical"
              onFinish={handleFinish}
              className="ease-in duration-300 w-[80%] sm:w-[60%]  shadow-sm backdrop-blur-md bg-white/80 lg:w-[50%] mx-auto rounded-md px-8 py-5"
              initialValues={{
                ...User,
              }}
            >
              <NavLink to="/">
                <img
                  src={logo}
                  alt=""
                  className="logo cursor-pointer mx-auto mb-6"
                />
              </NavLink>
              <Row gutter={20}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      placeholder="your first name"
                      className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="email"
                      disabled
                      placeholder="Enter your email"
                      className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Phone No"
                    disabled
                    name="phone"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      placeholder="your contact no"
                      className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Picture"
                    name="image"
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      placeholder="picture url"
                      className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    required
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      placeholder="your clinic address"
                      className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </Form.Item>
                </Col>





                <Col xs={24} md={24}>
                  <button
                    className="bg-gradient-to-r lowercase from-secondary mb-3 to-primary btn glass text-white hover:!bg-secondary w-full rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update
                  </button>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileUser;

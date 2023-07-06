import React from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import logo from "../assets/logo.svg";
import "./applydoctor.css";
import { toast, ToastContainer } from "react-toastify";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment/moment";
function ApplyDoctor() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doc-finder.onrender.com/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
      console.log(values);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Somthing Went Wrrong ");
    }
  };
  return (
    <div className="applydoctor">
      <div className="w-full mx-auto pt-[20vh]">
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="ease-in duration-300 w-[80%] sm:w-[60%]  shadow-sm backdrop-blur-md bg-white/80 lg:w-[50%] mx-auto rounded-md px-8 py-5"
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
                  placeholder="Enter your email"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Phone No"
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
            <Col xs={24} md={12}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your specialization"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your experience"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Fees"
                name="feesPerConsaltation"
                required
                rules={[{ required: true }]}
              >
                <Input
                  type="text"
                  placeholder="your fees"
                  className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Timings" name="timings" required>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24}>
              <button
                className="bg-gradient-to-r lowercase from-secondary mb-3 to-primary btn glass text-white hover:!bg-secondary w-full rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Apply as doctor
              </button>
            </Col>
          </Row>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ApplyDoctor;

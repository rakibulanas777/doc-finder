import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';

const DoctorDashboard = ({ doctor }) => {

    const [active, setActive] = useState(1)

    const buttonData = [

        {
            id: 1,
            name: 'Running',
            value: 'approved'
        },
        {
            id: 2,
            name: 'Complete',
            value: 'complete'
        },
        {
            id: 3,
            name: 'Review',
            value: 'review'
        }
    ]
    const [value, setValue] = useState({
        id: 1,
        name: 'Running',
        value: 'approved'
    })
    const handleBtnValue = (elm) => {
        setValue(elm)
        setActive(elm.id)
    }
    const params = useParams();
    const [appointments, setAppointments] = useState([]);
    const [revenue, setRevenue] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get(
                `https://doc-finder.onrender.com/api/v1/doctor/doctor-appointments?status=${value?.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                console.log(res.data)
                setAppointments(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { user } = useSelector((state) => state.user);

    console.log(doctor)

    const getRevenue = async () => {
        try {
            const res = await axios.get(
                `https://doc-finder.onrender.com/api/v1/doctor/revenue`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (res.data.success) {
                console.log(res.data)
                setRevenue(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const markComplete = async (id) => {
        try {
            const res = await axios.put(
                `https://doc-finder.onrender.com/api/v1/doctor/appointments/${id}/complete`,
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
        getRevenue()
        getAppointments();

    }, [value, revenue]);


    return (
        <div>
            <div className="container py-8 pt-[15vh] mx-auto">
                <div className="bg-gray-100 p-5">
                    <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-black py-6">My Revenue</div>
                    <div className="grid  pb-14 md:grid-cols-2 grid-cols-2 gap-8">
                        <div className="bg-gray-500 py-4 cursor-default text-center text-white font-medium px-6 text-xl">
                            Total Appoinment :{revenue?.totalAppointments}
                        </div>
                        <div className="bg-gray-500 py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
                            Earning: ${revenue?.totalRevenue}
                        </div>

                    </div>
                    <div className="flex gap-8 items-center mb-8">

                        {buttonData?.map((curElem) => (
                            <button className={active === curElem.id ? "text-xl px-4 py-3 text-white bg-black border-black border-2 rounded-sm  justify-center" : "text-xl px-4 py-3 text-black border-black border-2 rounded-sm  justify-center"} onClick={() => handleBtnValue(curElem)}>{curElem.name}</button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table text-xl text-black font-medium">
                            {/* head */}
                            <thead>
                                <tr className='text-xl text-black font-medium'>

                                    <th>Name</th>
                                    <th>Fees</th>



                                    <th>Action</th>


                                </tr>
                            </thead>
                            <tbody className=' cursor-pointer items-center'>
                                {
                                    appointments?.data?.map(appointment =>
                                        <tr>

                                            <td>{appointment?.userId?.name}</td>
                                            <td>${appointment?.doctorInfo?.feesPerConsaltation}</td>
                                            {
                                                appointment?.status !== 'complete' ? <button className="mt-3 text-white btn btn-success btn-sm" onClick={() => markComplete(appointment._id)}>Complete</button> : <button className="mt-3 text-white btn btn-error btn-sm">Completed</button>
                                            }
                                            {/* {
                                                <button className="mt-3 text-white btn btn-success btn-sm" onClick={() => markComplete(appointment._id)}>Complete</button>
                                            } */}
                                        </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
                        {myProduct?.map((curElem) => (
                            <Product curElem={curElem} />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default DoctorDashboard
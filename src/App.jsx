import "./App.css";
import Navbar from "./Component/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appoinment from "./pages/Appoinment";
import Login from "./pages/Login";

import Register from "./pages/Register";
import PublicRoute from "./Component/PublicRoute";
import ProtectedRoute from "./Component/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import Footer from "./pages/Footer";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe('pk_test_51LM2J1SIiDyURhxDNv1N4eG5FI9FdphG6ukPj3hrrSo6UWrgbl6o0nJqOwemWcbqjlKNBR8nqhl6rnfzz8VK2Sjx00y47ErW1D');
  return (
    <>
      <div data-theme="mytheme">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={

              <Home />

            }
          />
          <Route
            path="/applydoctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/appoinment"
            element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={

              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <BookingPage />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <Appoinment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

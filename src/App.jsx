import "./App.css";
import Navbar from "./Component/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appoinment from "./pages/Appoinment";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import PublicRoute from "./Component/PublicRoute";
import ProtectedRoute from "./Component/ProtectedRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";

function App() {
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
            path="/applydoctor"
            element={
              <ProtectedRoute>
                <ApplyDoctor />
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
          <Route path="/contact" element={<Contact />} />
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
      </div>
    </>
  );
}

export default App;

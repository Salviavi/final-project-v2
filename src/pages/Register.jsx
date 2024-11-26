import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.module.css";
import logo from "../images/logoCrop.png";
import { Link } from "react-router-dom";
import loginForm from "../images/loginForm.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangePasswordRepeat = (e) => setPasswordRepeat(e.target.value);
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const handleRegister = () => {
    const payload = {
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
      name: name,
      phoneNumber: phoneNumber,
      role: "admin", // Can adjust based on requirements
      profilePictureUrl: "", // You can add a default profile picture URL if needed
    };

    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((response) => {
        setSuccess("Registration successful!");
        setEmail("");
        setPassword("");
        setPasswordRepeat("");
        setName("");
        setPhoneNumber("");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful registration
        }, 2000);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || "Registration failed.");
        setSuccess("");
      });
  };

  return (
    <div>
      <div className="login-navbar">
        <nav className="login-container flex justify-between items-center">
          <img src={logo} className="logo pl-12" />
          <ul className="flex space-x-4 pr-12">
            <li>
              <Link
                to="/"
                className="inline-block text-white px-10 py-3 text-sm bg-gradient-to-r from-[#D862BC] to-[#fcb0b3] transition-transform duration-200 transform hover:scale-105 rounded-3xl"
              >
                Back to Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Create an Account</span>
            <span className="font-light text-gray-400 mb-8">
              Please fill in your details to register.
            </span>

            <div className="py-4">
              <span className="mb-2 text-md">Name</span>
              <input
                onChange={handleChangeName}
                type="text"
                name="name"
                id="name"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>

            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                onChange={handleChangeEmail}
                type="email"
                name="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>

            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                onChange={handleChangePassword}
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>

            <div className="py-4">
              <span className="mb-2 text-md">Confirm Password</span>
              <input
                onChange={handleChangePasswordRepeat}
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>

            <div className="py-4">
              <span className="mb-2 text-md">Phone Number</span>
              <input
                onChange={handleChangePhoneNumber}
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-[#D862BC] to-[#fcb0b3] text-white p-2 rounded-lg mb-6 transition transform hover:scale-105 duration-300 hover:border-gray-300"
            >
              Register
            </button>

            <div className="text-center text-gray-400">
              Already have an account?
              <Link to="/login" className="font-bold text-black">
                Log in here
              </Link>
            </div>
          </div>

          {/* Optional Image */}
          <div className="relative">
            <img
              src={loginForm}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

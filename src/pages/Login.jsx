import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.module.css";
import loginForm from "../images/loginForm.jpg";
import logo from "../images/logoCrop.png";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        const payload = {
            email: email,
            password: password
        };

        console.log(payload);

        axios.post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
            payload,
            {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
            }
        )
        .then((response) => {
            console.log(response);
            setSuccess("Login successful!");
            const token = response?.data?.token;
            
            if (token) {
                localStorage.setItem("access_token", token);
                // Optionally clear the fields
                setEmail("");
                setPassword("");
                setError("");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                setError("Login failed. Please try again.");
            }
        })
        .catch((err) => {
            console.log(err.response);
            setError(err?.response?.data?.error);
            setSuccess("");
        });
    };

    return (
        <div>

            {/* <div className="container">
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
                <h1>Login</h1>
                <label>Email</label>
                <input onChange={handleChangeEmail} type="email" placeholder="Email" />
                <label>Password</label>
                <input onChange={handleChangePassword} type="password" placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
            </div> */}

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
                        <span className="mb-3 text-4xl font-bold">Welcome back</span>
                        <span className="font-light text-gray-400 mb-8">
                            Welcome back! Please enter your details
                        </span>
                        <div className="py-4">
                            <span className="mb-2 text-md">Email</span>
                            <input
                            onChange={handleChangeEmail}
                            type="text"
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
                            name="pass"
                            id="pass"
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            />
                        </div>
                        <div className="flex justify-between w-full py-4">
                            <div className="mr-24">
                                <input type="checkbox" name="check" id="check" className="mr-2" />
                                <span className="text-md">Remember me for 30 days</span>
                            </div>
                            <span className="font-bold text-md">Forgot password</span>
                        </div>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-[#D862BC] to-[#fcb0b3] text-white p-2 rounded-lg mb-6 transition transform hover:scale-105 duration-300 hover:border-gray-300"
                        >
                            Log In
                        </button>
                        <div className="text-center text-gray-400">
                            Don't have an account?
                            <span className="font-bold text-black"> Register for free</span>
                        </div>

                    </div>
                    <div className="relative">
                    <img
                    src={loginForm}
                    alt="img"
                    className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover" />

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Login;

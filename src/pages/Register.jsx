import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../styles/register.css";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleChangeUsername = (e) => {
        setUserName(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = () => {
        const payload = {
            username: userName,
            password: password
        }

        console.log(payload)

        axios.post("https://reqres.in/api/register", payload)
        .then(res => {
            console.log(res);
            setSuccess("Registration successful!");
            localStorage.setItem("access_token", res?.data?.token);
            setError("")
            setTimeout(() => {
                navigate("/")
            }, 2000)
        }).catch(err => {
            console.log(err.response);
            setError(err?.response?.data?.error)
            setSuccess("")
        })
    }

    return (
        <div className="container">
            <Navbar />
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <h1>Register</h1>
            <label>Username</label>
            <input onChange={handleChangeUsername} type="text" placeholder="Username" />
            <label>Password</label>
            <input onChange={handleChangePassword} type="password" placeholder="Password" />
            <button onClick={handleRegister}>Sign Up</button>
        </div>
    );
}

export default Register;
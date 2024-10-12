import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../styles/login.css";

const Login = () => {
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

    const handleLogin = () => {
        const payload = {
            username: userName,
            password: password
        }

        console.log(payload)

        axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login", payload)
        .then(res => {
            console.log(res);
            setSuccess("Login successful!");
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
            <h1>Login</h1>
            <label>Username</label>
            <input onChange={handleChangeUsername} type="text" placeholder="Username" />
            <label>Password</label>
            <input onChange={handleChangePassword} type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/landing.css"
import logo from "../images/logoCrop.png";
import mbamba from "../images/landingMbamba2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Landing = () => {
    // setting below is for the carousel
    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
        pauseOnHover: true
      };
    

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
            headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
        })
        .then((res) => {
            console.log(res); // Log the entire response
            setCategories(res.data.data); // Assuming the data is inside res.data.data
        })
        .catch((err) => {
            console.log(err.response);
        });
    };


    useEffect(() => {
        getCategories();
    }, []);



    return (
        <div>
            <div className="hero">
                <nav className="container">
                    <img src={logo} className="logo" />
                    <ul>
                        <li><a href="#">Locations</a></li>
                        <li><a href="#">Activities</a></li>
                        <li><a href="#">Promos</a></li>
                    </ul>
                    <div>
                        <a href="#" className="login-btn">Log in</a>
                        <a href="#" className="reg-btn">Register</a>
                    </div>
                </nav>
                <div className="content">
                    <h1 className="animation">Book<br />A Journey</h1>
                    <p className="animation">Welcome to our travel site, Membolang! Find beautiful places to visit here, with reasonable price and accomodations. Our site will happily assist you in your traveling journey.</p>
                    <a href="#" className="join-btn animation">Join Now</a>
                </div>
                <img src={mbamba} className="model-img animation"/>
            </div>

            <div className="w-3/4 m-auto">
                <div className="mt-20">
                <Slider {...settings}>
                    {categories.map((category) => (
                        <div className="bg-white h-[450px] text-black rounded-xl">
                            <div className="h-56 rounded-t-xl bg-pink-500 bg-opacity-50 flex justify-center items-center">
                                <img src={category.imageUrl} className="h-44 w-44 rounded-full"/>
                            </div>
                                   
                            <div className="flex flex-col justify-center items-center gap-4 p-4">
                                <p className="text-xl font-semibold">{category.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>

                </div>
            </div>
        </div>
    );
};

export default Landing;
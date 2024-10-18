import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";
import logo from "../images/logoCrop.png";

const Dashboard = () => {
    const [expandedIndices, setExpandedIndices] = useState([]);
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios
            .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
            })
            .then((res) => {
                console.log(res);
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    // handle read more on product cards
    const toggleDescription = (index) => {
        setExpandedIndices((prevIndices) => {
            if (prevIndices.includes(index)) {
                return prevIndices.filter(i => i !== index);
            } else {
                return [...prevIndices, index];
            }
        });
    };

    // handle login logout
    // token
      const token = localStorage.getItem("access_token");

      // navigate
      const navigate = useNavigate(); 

      //handle logout

      const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <div className="">
                <nav className="container">
                    <img src={logo} className="logo" />
                    <ul>
                        <li><Link to="/">Back to Home</Link></li>
                    </ul>
                    <div>
                        {!token ? (
                        <>
                            <Link to="/login" className="login-btn">Log in</Link>
                            <Link to="/register" className="reg-btn">Register</Link>
                        </>
                        ) : (
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        )}
                    </div>
                    
                </nav>
            </div>

            <br />

            <div>
            <h1 className="text-4xl pl-10 text-violet-600 text-center">We have exclusive promos for you!</h1>
            </div>

            <br />
            <br />

            <div className="bg-gray-100 w-full min-h-screen gap-6 flex-wrap flex justify-center items-center pt-14">
                {categories.map((promo, index) => {
                    // Calculate discount percentage for each promo
                    const discountPercentage = ((promo.minimum_claim_price - promo.promo_discount_price) / promo.minimum_claim_price) * 100;

                    return (
                            <div key={promo.id} className="w-60 p-2 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
                                <img src={promo.imageUrl} alt="" className="h-40 object-cover rounded-xl" />
                                <div className="p-2">
                                    <h2 className="font-bold text-lg mb-2">{promo.title}</h2>

                                    <p className={`opacity-70 ${expandedIndices.includes(index) ? 'whitespace-normal' : 'overflow-hidden whitespace-nowrap overflow-ellipsis max-w-full'}`}>
                                        {promo.description}
                                    </p>

                                    <button onClick={() => toggleDescription(index)} className="text-blue-500 text-sm">
                                        {expandedIndices.includes(index) ? "Read Less" : "Read More"}
                                    </button>

                                    <br />
                                    <span className="text-xl font-semibold">
                                        {(promo.promo_discount_price).toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        })}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm line-through opacity-75">
                                        {(promo.minimum_claim_price).toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        })}
                                    </span>
                                    <span>Save {discountPercentage.toFixed(0)}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
    );
};

export default Dashboard;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logoCrop.png";

const Location = () => {
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log(categories);
  const getCategories = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
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
            <li>
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
          <div>
            {!token ? (
              <>
                <Link to="/login" className="login-btn">
                  Log in
                </Link>
                <Link to="/register" className="reg-btn">
                  Register
                </Link>
              </>
            ) : (
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>

      <br />

      <div>
        <h1 className="text-4xl pl-10 text-violet-600 text-center">
          Plan your locations you want to visit!
        </h1>
      </div>

      <br />
      <br />

      <div className="bg-gray-100 w-full min-h-screen gap-6 flex-wrap flex justify-center items-center pt-14">
        {categories.map((category, index) => {
          return (
            <div
              key={category.id}
              className="w-60 p-2 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0"
            >
              <img
                src={category.imageUrl}
                alt=""
                className="h-40 object-cover rounded-xl"
              />
              <div className="p-2">
                <h2 className="font-bold text-lg mb-2">{category.name}</h2>

                <br />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Location;

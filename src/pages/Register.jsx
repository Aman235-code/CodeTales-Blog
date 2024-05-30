import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      if (res.status === 200) {
        toast.success("Registration Successful !", {
          position: "top-center",
        });
        setusername(res.data.username);
        setemail(res.data.email);
        setpassword(res.data.password);
        navigate("/login");
        seterror(false);
      }
    } catch (error) {
      seterror(true);
      toast.error("Something Went Wrong !", {
        position: "top-center",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 font-serif  bg-purple-300">
        <h1 className="text-lg md:text-xl font-serif">
          <Link className="text-blue-800" to={"/"}>
            Code Tales
          </Link>
        </h1>
        <h3 className="font-serif border border-black text-black py-2 px-4 bg-green-500 cursor-pointer hover:bg-black hover:text-white text-lg rounded-lg">
          <Link to={"/login"}>Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[100vh] font-serif  bg-purple-300 text-lg">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your password"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold  bg-red-500 text-white rounded-lg hover:bg-green-500 hover:text-black"
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">Something Went Wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-red-700 ">
              <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

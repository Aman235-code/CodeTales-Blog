import axios from "axios";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { toast } from "react-toastify";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Successfully logged out !", {
          position: "top-center",
        });
      }
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error("Something Went Wrong !", {
        position: "top-center",
      });
      console.log(error);
    }
  };
  return (
    <div className="bg-green-400 z-10 text-black w-[150px] flex flex-col items-start absolute top-15 right-3 md:right-32 rounded-md p-4 space-y-2 cursor-pointer">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to={"/login"}> Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to={"/register"}> Register</Link>
        </h3>
      )}

      {user && (
        <h3 className=" text-lg hover:text-blue-500">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className=" text-lg hover:text-blue-500">
          <Link to={"/write"}>Write</Link>
        </h3>
      )}

      {user && (
        <h3 className=" text-lg hover:text-blue-500">
          <Link to={"/myblogs/" + user._id}>My Blogs</Link>
        </h3>
      )}
      {user && (
        <h3 onClick={handleLogout} className=" text-lg hover:text-blue-500">
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;

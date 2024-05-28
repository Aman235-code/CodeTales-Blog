import axios from "axios";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4 cursor-pointer">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">Login</h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">Register</h3>
      )}

      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">Profile</h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">Write</h3>
      )}

      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">My Blogs</h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;

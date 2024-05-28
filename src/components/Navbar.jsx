import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { FaBars } from "react-icons/fa6";
import Menu from "./Menu";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setprompt] = useState("");
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setmenu(!menu);
  };
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to={"/"}>Code Tales</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
            className="cursor-pointer"
          >
            <VscSearch />
          </p>
          <input
            type="text"
            onChange={(e) => setprompt(e.target.value)}
            placeholder="Search a post"
            className="outline-none px-3 py-1 "
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to={"/write"}>Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to={"/login"}>Login</Link>
          </h3>
        )}

        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to={"/register"}>Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;

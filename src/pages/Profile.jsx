import React, { useState, useContext, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "./../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [updated, setupdated] = useState(false);
  const [posts, setposts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const param = useParams().id;
  const navigate = useNavigate();

  const handleUserUpdate = async () => {
    try {
      setupdated(false);
      const res = await axios.put(
        URL + "/api/user/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      setupdated(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/user/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/post/user/" + user._id);
      setposts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/user/" + user._id);
      setusername(res.data.username);
      setemail(res.data.email);
      setpassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-12 flex md:flex-row flex-col-reverse md:items-start font-serif text-lg h-[100vh]">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl mb-4">Your Posts</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl mb-4">Profile</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your Username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your Email"
            />
            {/* <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your Password"
            /> */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white rounded-lg hover:bg-red-500 bg-black px-4 py-2 hover:text-black "
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white  rounded-lg hover:bg-red-500 bg-black px-4 py-2 hover:text-blacks"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-lg text-center mt-4">
                User Updated Successfully
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

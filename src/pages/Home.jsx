import axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { UserContext } from "./../context/UserContext";

const Home = () => {
  const { search } = useLocation();

  const [posts, setposts] = useState([]);
  const [noResults, setnoResults] = useState(false);
  const [loader, setloader] = useState(false);
  const { user } = useContext(UserContext);
  console.log("user is", user);
  const fetchPosts = async () => {
    try {
      setloader(true);
      const res = await axios.get(URL + "/api/post/" + search);
      setposts(res.data);
      if (res.data.length === 0) {
        setnoResults(true);
      } else {
        setnoResults(false);
      }
      setloader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            Loading
          </div>
        ) : noResults ? (
          <h3 className="text-center font-bold mt-60">No Posts Available</h3>
        ) : (
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />
              </Link>
            </>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;

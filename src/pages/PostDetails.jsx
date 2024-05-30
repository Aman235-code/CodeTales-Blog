import React, { useEffect, useState, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL, IF } from "../url";
import { UserContext } from "./../context/UserContext";
import { toast } from "react-toastify";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setpost] = useState([]);
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState("");
  const [loader, setloader] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setloader(true);
    try {
      const res = await axios.get(URL + `/api/post/${postId}`, {
        withCredentials: true,
      });

      setpost(res.data);
      setloader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/post/" + postId, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("post deleted successfully  !", {
          position: "top-center",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting post !", {
        position: "top-center",
      });
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comment/post/" + postId);
      setcomments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/comment/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Comment added successfully  !", {
          position: "top-center",
        });
      }

      window.location.reload(true);
    } catch (error) {
      console.log(error);
      toast.error("Error in adding comment !", {
        position: "top-center",
      });
    }
  };
  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="flex justify-center items-center w-full">Loading</div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8 font-serif text-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-black md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>By: {post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img src={IF + post.photo} alt="" className="w-[40%] mx-auto mt-2" />
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((category, index) => (
                <div key={index} className="bg-gray-300 rounded-lg px-3 py-1">
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4 text-lg">
            <h3 className="mt-6 mb-4">Comments</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* Write a Comment  */}
          <div className="flex flex-col mt-4 mb-24 md:flex-row">
            <input
              onChange={(e) => setcomment(e.target.value)}
              type="text"
              className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0"
              placeholder="Write a Comment"
            />
            <button
              onClick={postComment}
              className="bg-red-500 rounded-lg hover:bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0"
            >
              Add
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;

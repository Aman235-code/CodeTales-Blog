import React, { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const EditPost = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [file, setfile] = useState(null);
  const [cat, setcat] = useState("");
  const [cats, setcats] = useState([]);
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/post/" + postId);

      settitle(res.data.title);
      setdesc(res.data.desc);
      setfile(res.data.photo);
      setcats(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const addCategory = () => {
    let updatedCat = [...cats];
    updatedCat.push(cat);
    setcat("");
    setcats(updatedCat);
  };
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setcats(updatedCats);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.put(URL + "/api/post/" + postId, newPost, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Successfully edited a post !", {
          position: "top-center",
        });
      }
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      toast.error("Error in editing a post !", {
        position: "top-center",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8 font-serif text-lg h-[100vh]">
        <h1 className=" md:text-2xl text-xl text-center">Update a post</h1>
        <form
          action=""
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
        >
          <input
            type="text"
            className="px-4 py-2 outline-none border border-black rounded-lg"
            name=""
            id=""
            onChange={(e) => settitle(e.target.value)}
            value={title}
            placeholder="Enter post title"
          />
          <input
            onChange={(e) => setfile(e.target.files[0])}
            type="file"
            className="px-4"
            name=""
            id=""
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                value={cat}
                onChange={(e) => setcat(e.target.value)}
                className="px-4 py-2 outline-none border border-black rounded-lg"
                placeholder="Enter Post Category"
              />
              <div
                onClick={addCategory}
                className="bg-red-400 hover:bg-black text-white px-5 rounded-lg py-2 cursor-pointer"
              >
                Update
              </div>
            </div>

            {/* categories  */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <textarea
            className="px-4 py-2 outline-none border border-black rounded-lg"
            placeholder="Enter post description"
            onChange={(e) => setdesc(e.target.value)}
            value={desc}
            name=""
            id=""
            cols="30"
            rows="5"
          ></textarea>
          <button
            onClick={handleUpdate}
            className="bg-red-500 hover:text-black hover:bg-green-300 rounded-lg w-full md:w-[20%] mx-auto text-white px-4 py-2 md:text-x; text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;

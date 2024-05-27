import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";

const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {" "}
            Bootstap intro
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@aman</p>
          <div className="flex space-x-2">
            <p>16/8/2024</p>
            <p>16:45</p>
          </div>
        </div>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F27-278320_bootstrap-logo-logo-png-bootstrap-logo-transparent-png.png&f=1&nofb=1&ipt=eb38914e97a55f45d406ec1fdbec5dbbf8bdcb3561f82e6764411c5ceacd0f92&ipo=images"
          alt=""
          className="w-full mx-auto mt-8"
        />
        <p className="mx-auto mt-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dicta
          autem perferendis voluptatibus obcaecati cumque culpa itaque non
          veritatis. Porro sunt recusandae impedit at. Explicabo doloribus
          dolore itaque totam sapiente modi, porro placeat tempora?
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Ai</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments</h3>
          <Comment />
          <Comment />

          {/* <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@johndoe</h3>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500 text-sm">18/06/2024</p>
                <p className="text-gray-500 text-sm"> 16:45</p>
                <div className="flex items-center justify-center space-x-2">
                  <p>
                    <BiEdit />
                  </p>
                  <p>
                    <MdDelete />
                  </p>
                </div>
              </div>
            </div>
            <p className="px-4 mt-2">Nice Information</p>
          </div> */}

          {/* <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@johndoe</h3>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500 text-sm">18/06/2024</p>
                <p className="text-gray-500 text-sm"> 16:45</p>
                <div className="flex items-center justify-center space-x-2">
                  <p>
                    <BiEdit />
                  </p>
                  <p>
                    <MdDelete />
                  </p>
                </div>
              </div>
            </div>
            <p className="px-4 mt-2">Nice Information</p>
          </div> */}
        </div>
        {/* Write a Comment  */}
        <div className="flex flex-col mt-4 md:flex-row">
          <input
            type="text"
            className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0"
            placeholder="Write a Comment"
          />
          <button className="bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0">
            Add
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;

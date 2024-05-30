import React from "react";
import { IF } from "../url";

const HomePosts = ({ post }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 font-serif text-lg border border-black px-6 py-2 rounded-lg">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF + post.photo}
          alt=""
          className="h-full w-[200px] object-cover"
        />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl  md:mb-2 mb-1 md:text-2xl text-red-500">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm  text-gray-500 items-center justify-between md:mb-4">
          <p>{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.slice(0, 200) + "...Read More"}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;

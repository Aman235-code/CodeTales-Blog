import React from "react";

const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F27-278320_bootstrap-logo-logo-png-bootstrap-logo-transparent-png.png&f=1&nofb=1&ipt=eb38914e97a55f45d406ec1fdbec5dbbf8bdcb3561f82e6764411c5ceacd0f92&ipo=images"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          Bootstap intro
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@aman</p>
          <div className="flex space-x-2">
            <p>16/8/2024</p>
            <p>16:45</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          optio expedita autem! Ab necessitatibus voluptas similique deserunt,
          adipisci consequatur eaque ex ullam eligendi autem accusamus totam
          voluptate delectus alias provident minus! Iusto, repellendus illum.
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;

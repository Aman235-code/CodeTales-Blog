import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(URL + `/api/comment/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Successfully deleted a comment !", {
          position: "top-center",
        });
      }
      window.location.reload(true);
    } catch (err) {
      toast.error("Error in deleting comment !", {
        position: "top-center",
      });
      console.log(err);
    }
  };
  return (
    <div className="px-4 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="px-4 font-bold text-gray-600">{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              {/* <p>
              <BiEdit />
            </p> */}
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;

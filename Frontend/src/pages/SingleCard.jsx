import React from "react";
import { useNavigate } from "react-router-dom";

const SingleCard = ({ post }) => {
  const navigate = useNavigate();
  const handleData = () => {
    navigate("/single-item-details", { state: { post } });
  };
  return (
    <div className="card bg-base-200 shadow-xl">
      <figure>
        <img
          src={post?.imageUrl}
          alt="Image"
          className="p-5 rounded h-[90%] w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post?.text}</h2>
        <p>
          <span className="font-semibold">Name : </span>
          {post?.userName}
        </p>
        <p>
          <span className="font-semibold">Email : </span>
          {post?.email}
        </p>
        <p>
          <span className="font-semibold">Date : </span>
          {new Date(post?.createdAt).toLocaleString()}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={handleData}
            className="px-4 py-2 border shadow-md border-orange-600 rounded hover:bg-orange-500 hover:text-white"
          >
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;

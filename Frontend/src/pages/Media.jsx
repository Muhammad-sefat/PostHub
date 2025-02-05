import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import axios from "axios";

const Media = () => {
  const [post, setPost] = useState([]);
  console.log(post);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/datas");
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="p-10">
      <h1 className="md:text-3xl font-semibold text-center">
        This is our recent activatices
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {post.map((post) => (
          <SingleCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Media;

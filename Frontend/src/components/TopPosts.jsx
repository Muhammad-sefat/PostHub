import axios from "axios";
import React, { useEffect, useState } from "react";

const TopPosts = () => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/top-posts");
        if (response.data && response.data.posts) {
          setTopPosts(response.data.posts);
        }
      } catch (error) {
        console.error("Error fetching top posts:", error);
      }
    };
    fetchTopPosts();
  }, []);
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4 text-center my-8">Top Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topPosts.map((post) => (
          <div key={post._id} className="border rounded p-4 shadow-sm bg-white">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full object-cover my-2"
              />
            )}
            <h2 className="font-bold my-2">{post.text}</h2>
            <p>Love Count : {post.loveCount}</p>
            <p>Like Count : {post.likeCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPosts;

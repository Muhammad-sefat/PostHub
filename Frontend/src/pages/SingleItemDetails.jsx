import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const SingleItemDetails = () => {
  // Extract the post from location.state (adjust the property name as passed)
  const location = useLocation();
  const { post: initialPost } = location.state || {};

  // If there is no state data, you might want to handle that (for example, show an error or redirect)
  if (!initialPost) {
    return (
      <div className="p-10">
        No post data found. Please navigate from the main page.
      </div>
    );
  }

  // Initialize state with the passed data
  const [post, setPost] = useState(initialPost);
  const [likeCount, setLikeCount] = useState(initialPost.likeCount || 0);
  const [loveCount, setLoveCount] = useState(initialPost.loveCount || 0);
  const [comments, setComments] = useState(initialPost.comments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Optionally, if you wish to refresh post details on mount (or on a timer), you could do so.
  // For now, we'll use the passed data only.

  // Handler for adding a reaction (like or love)
  const handleReaction = async (reactionType) => {
    try {
      // Prepare payload using unique identifiers from the post (for example, email & createdAt)
      const payload = {
        email: post.email,
        createdAt: post.createdAt,
        reaction: reactionType,
      };

      // Call backend endpoint for updating reaction
      await axios.patch("http://localhost:5000/update-post/reaction", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update local state for instant feedback
      if (reactionType === "like") {
        setLikeCount((prev) => prev + 1);
      } else if (reactionType === "love") {
        setLoveCount((prev) => prev + 1);
      }
      toast.success("Reaction added!");
    } catch (error) {
      console.error("Error updating reaction:", error);
      toast.error("Failed to update reaction.");
    }
  };

  // Handler for submitting a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      setLoading(true);
      // Prepare payload using the post identifiers
      const payload = {
        email: post.email,
        createdAt: post.createdAt,
        comment: newComment,
      };

      // Call backend endpoint to add a comment
      const response = await axios.post(
        "http://localhost:5000/update-post/comment",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Assuming the backend returns the updated post with comments
      if (response.data && response.data.post) {
        setComments(response.data.post.comments);
      }
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="card bg-base-200 shadow-xl">
        <figure>
          <img src={post.imageUrl} alt="Post" className="p-5 rounded" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.text}</h2>
          <p>
            <span className="font-semibold">Name: </span>
            {post.userName}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {post.email}
          </p>
          <p>
            <span className="font-semibold">Date: </span>
            {new Date(post.createdAt).toLocaleString()}
          </p>
          <div className="flex space-x-4 my-4">
            <button
              onClick={() => handleReaction("like")}
              className="btn btn-sm bg-blue-500 text-white"
            >
              Like ({likeCount})
            </button>
            <button
              onClick={() => handleReaction("love")}
              className="btn btn-sm bg-pink-500 text-white"
            >
              Love ({loveCount})
            </button>
          </div>
          <hr className="my-4" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Comments</h3>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {comments.map((comment, index) => (
                  <li key={index} className="border p-2 rounded">
                    {comment}
                  </li>
                ))}
              </ul>
            )}
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                className="w-full border rounded p-2 mb-2"
                rows="3"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Submitting..." : "Submit Comment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItemDetails;

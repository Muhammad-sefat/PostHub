import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthProvider";

const SingleItemDetails = () => {
  const location = useLocation();
  const { post: initialPost } = location.state || {};
  const { user } = useAuth();

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
  const [likedBy, setLikedBy] = useState(initialPost.likedBy || []);
  const [lovedBy, setLovedBy] = useState(initialPost.lovedBy || []);
  const [comments, setComments] = useState(initialPost.comments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler for adding a reaction (like or love) and updating the backend instantly
  const handleReaction = async (reactionType) => {
    try {
      // Check if current user already reacted for that type
      if (
        reactionType === "like" &&
        likedBy.some((item) => item.reactorEmail === user.email)
      ) {
        toast.error("You have already liked this post");
        return;
      }
      if (
        reactionType === "love" &&
        lovedBy.some((item) => item.reactorEmail === user.email)
      ) {
        toast.error("You have already loved this post");
        return;
      }

      // Prepare payload with post identifiers and reactor info
      const payload = {
        email: post.email, // post author's email (to identify the post)
        createdAt: post.createdAt,
        reaction: reactionType,
        reactorEmail: user.email,
        reactorName: user.displayName,
      };

      // Call backend endpoint to update the reaction
      const response = await axios.patch(
        "https://posthub-one.vercel.app/update-post/reaction",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // If successful, update local state with the updated post data
      if (response.data && response.data.post) {
        const updatedPost = response.data.post;
        setPost(updatedPost);
        setLikeCount(updatedPost.likeCount);
        setLoveCount(updatedPost.loveCount);
        setLikedBy(updatedPost.likedBy || []);
        setLovedBy(updatedPost.lovedBy || []);
      }
      toast.success("Reaction added successfully!");
    } catch (error) {
      console.error("Error updating reaction:", error);
      toast.error("Failed to update reaction.");
    }
  };

  // Handler for submitting a new comment (updates backend instantly)
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        email: post.email,
        createdAt: post.createdAt,
        comment: { userName: user.displayName, text: newComment },
      };

      // Call backend endpoint to add the comment
      const response = await axios.post(
        "https://posthub-one.vercel.app/update-post/comment",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.post) {
        const updatedPost = response.data.post;
        setPost(updatedPost);
        setComments(updatedPost.comments || []);
      }
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare tooltips: list the names of the users who have reacted
  const likeTooltip =
    likedBy.map((item) => item.reactorName).join(", ") || "No likes yet";
  const loveTooltip =
    lovedBy.map((item) => item.reactorName).join(", ") || "No loves yet";

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
              title={likeTooltip}
              className="btn btn-sm bg-blue-500 text-white"
            >
              Like ({likeCount})
            </button>
            <button
              onClick={() => handleReaction("love")}
              title={loveTooltip}
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
                    <strong>{comment.userName}</strong> <br />
                    {comment.text}
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

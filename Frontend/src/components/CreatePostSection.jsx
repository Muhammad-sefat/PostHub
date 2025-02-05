import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { uploadImageToImgBB } from "./UpLoadImages";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePostSection = () => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to create a post.");
      return;
    }

    setLoading(true);

    try {
      // Upload image if one is selected, otherwise keep it null
      const imageUrl = image ? await uploadImageToImgBB(image) : null;

      // Prepare your post data
      const postData = {
        text,
        imageUrl,
        email: user.email,
        userName: user.displayName,
        createdAt: new Date().toISOString(),
      };
      console.log(postData);

      // Send post data to your backend API
      const response = await axios.post(
        "http://localhost:5000/post-data",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // You can handle the response here if needed
      toast.success("Post created successfully");

      // Reset form fields
      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      // Optionally, display an error toast or message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="max-w-xl bg-gray-50 mx-auto my-8 p-4 border border-gray-200 rounded shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-gray-300 rounded p-2 mb-4"
            rows="4"
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreatePostSection;

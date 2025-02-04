import React, { useState } from "react";

const CreatePostSection = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare your post data
    const postData = { text, image };

    // You can process the postData here (e.g., call your API to save the post)
    if (onSubmit) {
      onSubmit(postData);
    }

    // Reset the form fields
    setText("");
    setImage(null);
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreatePostSection;

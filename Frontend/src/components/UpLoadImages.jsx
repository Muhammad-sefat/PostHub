export const uploadImageToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const apiKey = "113335d957a056843f3a7f3cf45d4ce0"; // Replace with your actual API key

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }
    return data.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

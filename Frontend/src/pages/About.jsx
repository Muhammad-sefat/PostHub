// About.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthProvider";

const About = () => {
  const { user } = useAuth(); // user should have email, displayName, photoURL, etc.

  // Profile data fetched from your backend
  const [profile, setProfile] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    mobile: "",
    university: "",
    address: "",
  });

  // State to control whether we're in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Local form state for editing (only mobile, university, and address are editable)
  const [form, setForm] = useState({
    mobile: "",
    university: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch the user profile from your backend when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.email) {
        try {
          // Use the user's email as the identifier in the endpoint URL
          const response = await axios.get(
            `http://localhost:5000/profile/${user.email}`
          );
          if (response.data && response.data.profile) {
            const fetchedProfile = response.data.profile;

            const mergedProfile = {
              displayName: user.displayName,
              email: user.email,
              mobile: fetchedProfile.mobile || "",
              university: fetchedProfile.university || "",
              address: fetchedProfile.address || "",
            };
            setProfile(mergedProfile);
            setForm({
              mobile: mergedProfile.mobile,
              university: mergedProfile.university,
              address: mergedProfile.address,
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedData = {
        displayName: user.displayName,
        email: user.email,
        mobile: form.mobile,
        university: form.university,
        address: form.address,
      };
      const response = await axios.patch(
        `http://localhost:5000/profile/${user.email}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data && response.data.profile) {
        console.log("Profile updated:", response.data.profile);
        setProfile(response.data.profile);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4 text-center my-5">About Me</h1>
      <div className="flex justify-center items-center">
        <div className="border p-10 rounded md:w-[40%]">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-44 h-44 rounded-full mx-auto mb-6"
          />
          <p>
            <strong>Name : </strong> {profile.displayName || "Not provided"}
          </p>
          <p className="my-2">
            <strong>Email : </strong> {profile.email || "Not provided"}
          </p>
          <p>
            <strong>Mobile : </strong> {profile.mobile || "Not provided"}
          </p>
          <p className="my-2">
            <strong>University : </strong>{" "}
            {profile.university || "Not provided"}
          </p>
          <p className="my-2">
            <strong>Address : </strong> {profile.address || "Not provided"}
          </p>
          <button
            onClick={handleEditClick}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Modal Popup for editing */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <label className="block mb-2">
              Mobile:
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border p-2 mt-1"
                type="text"
              />
            </label>
            <label className="block mb-2">
              University:
              <input
                name="university"
                value={form.university}
                onChange={handleChange}
                className="w-full border p-2 mt-1"
                type="text"
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border p-2 mt-1"
                type="text"
              />
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;

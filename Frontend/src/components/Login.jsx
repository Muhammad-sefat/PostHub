import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login with Google successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-md rounded-md w-96 my-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="input input-bordered w-full mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Login with Google
        </button>
        <p className="my-5 text-center">
          Haven't Account ? Please{" "}
          <Link to={"/register"} className="underline">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

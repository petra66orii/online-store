import { useState } from "react";
import api from "../api/axios"; // Assuming this is your Axios instance
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setIsLoading(true); // Start loading

    // Client-side validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      const res = await api.post("token/", { email, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      // More specific error handling could be added here based on err.response.status
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      console.error("Login error:", err); // Log the full error for debugging
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign In
      </h2>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      )}
      <button
        type="submit"
        className={`w-full p-3 rounded-md text-white font-semibold transition duration-300
          ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        disabled={isLoading} // Disable button when loading
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

export default Signin;

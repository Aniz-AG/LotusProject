import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const success = await updatePassword(password);
      if (success) {
        navigate("/login");
      } else {
        setErrorMsg("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  const updatePassword = async (newPassword) => {
    // API call to update the password
    try {
      const response = await fetch("https://example.com/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      return response.ok;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-my-gradient-1">
      <form onSubmit={handleSubmit} className="bg-my-gradient-1 p-5 shadow-md">
        <h1 className="text-3xl mb-5 text-center">Change Password</h1>
        <div>
          <label htmlFor="password" className="block mb-2">
            New Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2 mt-3">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-5 mt-5 w-full">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;

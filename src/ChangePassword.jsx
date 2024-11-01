import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPass } from "./Util/passslice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [errorText, setErrorText] = useState("");

  const token = useSelector((state) => state.userDetail.token);

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleAddUser  = (password) => {
    dispatch(addPass({ password }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(newPassword, confirmPassword);

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await fetchData(newPassword, token);
      setMsg("Successfully changed password");
      handleAddUser (newPassword);
      navigate("/login");
    } catch (error) {
      setErrorText("Failed to change password. Please try again.");
    }
  };

  const validate = (newPassword, confirmPassword) => {
    const errors = {};
    if (!newPassword) {
      errors.newPass = "New Password is required!";
    }
    if (!confirmPassword) {
      errors.confirmPass = "Confirm Password is required!";
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.match = "Passwords do not match!";
    }
    return errors;
  };

  const fetchData = async (newPassword) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      new_pass: newPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://lotus365matka.in/api-change-password",
      requestOptions
    );
    const result = await response.json();
    console.log("api response:",result);
    if (result?.status !== true) {
      throw new Error("Failed to change password");
    }
  };


  return (
    <div className="bg-my-gradient-1 h-[100vh] flex flex-col items-center ">
      <h1 className="text-white text-2xl font-bold underline">Change Password</h1>
      <form onSubmit={handleSubmit} className="bg-transparent p-6 rounded-md shadow-md">
        <div className="mb-6 relative">
          <label className="block pl-3 font-bold text-white">New Password</label>
          <div className="relative">
            <FiLock className="absolute inset-y-0 left-0 pl-3 h-6 w-6 text-gray-400" />
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md bg-white pl-10 p-3"
            />
            <button
              type="button"
              onClick={handleToggleNewPassword}
              className="absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center mr-2 focus:outline-none"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <p className="text-red-500">{formErrors.newPass}</p>
          </div>
        </div>
        <div className="mb-6 relative">
          <label className="block pl-3 font-bold text-white">Confirm New Password</label>
          <div className="relative">
            <FiLock className="absolute inset-y-0 left-0 pl-3 h-6 w-6 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md bg-white pl-10 p-3"
            />
            <button
              type="button"
              onClick={handleToggleConfirmPassword}
              className="absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center mr-2 focus:outline-none"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            <p className="text-red-500">{formErrors.confirmPass}</p>
            <p className="text-red-500">{formErrors.match}</p>
            <p className="text-green-500">{msg}</p>
            <p className="text-red-500">{errorText}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="text-white px-10 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500"
            type="submit"
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

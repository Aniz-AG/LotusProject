import React, { useState, useRef, useEffect } from "react";
import topBackground from "./Images/bg.png";
import changePassword from "./Images/change_password_icon.png";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPass } from "./Util/passslice";
function Changepass() {
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };

  const changePassStyle = {
    // backgroundImage: `url(${topBackground})`,
    backgroundSize: "cover",
  };
  const dispatch = useDispatch();
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [errorText, setErrorText] = useState("");
  const [msg, setmsg] = useState("");
  const [issubmit, setIsSubmit] = useState(false);

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();
  const back = () => {
    navigate("/imp");
  };

  const handleAdduser = (password) => {
    dispatch(addPass({ password: password }));
  };

  const token = useSelector((state) => state.userDetail.token);
  const pass = useSelector((state) => state.userDetail2.password);
  console.log(pass);

  useEffect(() => {
    if (issubmit && msg) {
      // Password changed successfully
    }
    if (issubmit && errorText) {
      // Handle error
    }
  }, [issubmit, msg, errorText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(
      currentPassword.current.value,
      newPassword.current.value,
      confirmPassword.current.value
    );

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await fetchData(
        currentPassword.current.value,
        newPassword.current.value,
        token
      );
      setIsSubmit(true);
      setmsg("Successfully changed password");
      handleAdduser(newPassword.current.value);
    } catch (error) {
      setErrorText("Old password is incorrect");
    }
  };

  const validate = (currentPassword, newPassword, confirmPassword) => {
    const errors = {};

    if (!currentPassword) {
      errors.conf0 = "Current Password is required!";
    } else if (currentPassword !== pass) {
      errors.conf4 = "Old password does not match";
    }

    if (!newPassword) {
      errors.conf1 = "New Password is required!";
    }
    if (!confirmPassword) {
      errors.conf2 = "Confirm Password is required!";
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.conf3 = "Confirm Password is not equal to New Password!";
    }
    return errors;
  };

  const fetchData = async (currentPassword, newPassword, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
    );

    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token: token,
      old_pass: currentPassword,
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

    if (result?.status === true) {
      // Password changed successfully
    } else {
      throw new Error("Invalid username and password");
    }
  };

  return (
    <>
      <div className="font-bold flex items-center justify-center text-2xl mt-2 mb-2">
        <h1>Change Password</h1>
      </div>
      <div style={changePassStyle}>
        <div className="flex justify-center items-center ">
          <form onSubmit={handleSubmit}>
            <div className="bg-transparent p-6 rounded-md shadow-md">
              <div className="mb-6 relative">
                <label className="block mb-1 font-bold text-black">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-6 w-6 text-black" />
                  </div>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Password"
                    ref={currentPassword}
                    className="w-full rounded-md border-gray-300 bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pl-10 p-3 text-black"
                    style={{ width: "300px" }}
                    name="password"
                  />

                  <button
                    type="button"
                    onClick={handleToggleCurrentPassword}
                    className="absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center mr-2 focus:outline-none"
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <p className="text-red-500">{formErrors.conf0}</p>
                </div>
              </div>
              <div className="mb-6 relative">
                <label className="block mb-1 font-bold text-black">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-6 w-6 text-black" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    ref={newPassword}
                    className="w-full rounded-md border-gray-300 bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pl-10 p-3 text-black"
                    style={{ width: "300px" }}
                    name="newPassword"
                  />
                  <button
                    type="button"
                    onClick={handleToggleNewPassword}
                    className="absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center mr-2 focus:outline-none"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <p className="text-red-500">{formErrors.conf1}</p>
                </div>
              </div>
              <div className="mb-6 relative">
                <label className="block mb-1 font-bold text-black">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-6 w-6 text-black" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Confirm Password"
                    ref={confirmPassword}
                    className="w-full rounded-md border-gray-300 bg-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pl-10 p-3 text-black"
                    style={{ width: "300px" }}
                    name="confirmPassword"
                  />
                  <button
                    type="button"
                    onClick={handleToggleConfirmPassword}
                    className="absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center mr-2 focus:outline-none"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                  <p className="text-red-500">{formErrors.conf2}</p>
                  <p className="text-red-500">{formErrors.conf3}</p>
                  <p className="text-red-500">{formErrors.conf4}</p>
                  <p className="text-green-500">{msg}</p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  className="text-white px-10 py-2 rounded-md  bg-yellow-600 hover:bg-yellow-500"
                  type="submit"
                >
                  Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Changepass;

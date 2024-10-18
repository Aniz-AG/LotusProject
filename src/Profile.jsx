import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./Util/loginSlice";
import { FaUser } from "react-icons/fa";

function Profile() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef();
  const username = useSelector((state) => state.userDetail.username);
  const mobile = useSelector((state) => state.userDetail.mobile);
  const unique_token = useSelector((state) => state.userDetail.token);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleAddUser = (username_, unique_token, mobile) => {
    dispatch(login({ username: username_, token: unique_token, mobile }));
  };

  const validate = (name) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required!";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    const errors = validate(name.current.value);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      await fetchData(name.current.value, unique_token, mobile);
      setIsSubmit(true);
    } catch (error) {
      console.error("Error occurred during data fetching:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async (name, unique_token, mobile) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      env_type: "Prod",
      app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
      unique_token,
      user_name: name,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch("https://lotus365matka.in/api-profile-update", requestOptions);

      if (!response.ok) throw new Error("Network response was not ok");

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        handleAddUser(name, unique_token, mobile);
        navigate("/imp");
      } else {
        const text = await response.text();
        const startIndex = text.indexOf("{");
        const endIndex = text.lastIndexOf("}") + 1;
        const jsonData = text.substring(startIndex, endIndex);
        const result = JSON.parse(jsonData);
        handleAddUser(name, unique_token, mobile);
        navigate("/imp");
      }
    } catch (error) {
      console.error("Error occurred during data fetching:", error);
    }
  };

  return (
    <div className="bg-my-gradient-1 h-screen flex justify-center">
      <div className="bg-white h-[180px] shadow-lg rounded-lg p-8 w-[80%] max-w-md mt-[50px]">
        <div className="flex items-center justify-center mb-4">
          <FaUser className="w-10 h-10 text-gray-600 mr-2" />
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800">{username}</p>
            <p className="text-sm text-gray-600">{mobile}</p>
          </div>
        </div>

        <button
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full mb-4"
          onClick={toggleInput}
        >
          {showInput ? "Cancel" : "Edit Profile"}
        </button>

        {showInput && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                ref={name}
                placeholder="Enter Your Name"
                className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;

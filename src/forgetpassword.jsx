import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "./assets/ICONS AND BACKGROUNDS/login signup back.png";
import logo from "./assets/ICONS AND BACKGROUNDS/Transparent logo.png";
import { useDispatch } from "react-redux";
import { setOtpDetails } from "./Util/forgotPasswordSlice";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (phone) => {
    const errors = {};
    const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

    if (!phone) {
      errors.phone = "Phone number is required!";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Phone number is not valid!";
    }

    return errors;
  };

  const sendOtp = async (phone) => {
    try {
      const response = await fetch("https://lotus365matka.in/api-forget-check-mobile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          env_type: "Prod",
          app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
          mobile: phone,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      const data = await response.json();
      
      // Check if the OTP was sent successfully
      if (data.status) {
        dispatch(setOtpDetails({ otp: data.otp, phone })); // Dispatch the OTP and phone number
        navigate("/otp");
      } else {
        throw new Error(data.msg); 
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setFormErrors({ phone: error.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validate(phone);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      await sendOtp(phone); // Call the sendOtp function
    }
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
      className="bg-my-gradient-1"
    >
      <form className="flex flex-col p-6 pt-0 rounded-lg shadow-lg w-11/12 max-w-sm" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center mb-6">
          <img src={logo} alt="Logo" className="w-32 h-32 rounded-xl mb-4" />
          <h3 className="font-bold text-lg text-center">Verify your phone number to reset your password</h3>
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="py-2 pl-1 border-b-2 border-gold-500 focus:outline-none mb-4"
          style={{
            backgroundColor: "transparent",
            borderBottom: "2px solid goldenrod",
            boxShadow: "none",
            color: "white",
          }}
          name="phone"
        />
        {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="flex justify-center items-center mb-5">
          <button
            className="text-white font-bold py-3 border border-black rounded-xl mt-4 w-full bg-gradient-to-r from-yellow-700 to-yellow-300 hover:bg-yellow-500 transition duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>
        <div className="flex justify-center">
          <p>
            Remember your password?{" "}
            <Link to="/login" className="text-yellow-500 font-bold">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

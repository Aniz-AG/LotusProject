import { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "./assets/ICONS AND BACKGROUNDS/login signup back.png";
import logo from "./assets/ICONS AND BACKGROUNDS/Transparent logo.png";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validate(phone);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Simulate sending a reset link (can replace with actual API call)
      setTimeout(() => {
        setSuccessMessage("A password reset link has been sent to your phone.");
        setIsSubmitting(false);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }} className="bg-my-gradient-1">
      <form className="flex flex-col p-5 pt-0 z-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center mb-6">
          <img src={logo} alt="Logo" className="w-40 h-40 rounded-xl mb-[60px] translate-y-[-70px] mr-[120px]" />
          <h3 className="font-bold text-[13px] text-white translate-y-[-50px]">Enter your phone number to reset your password</h3>
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="py-2 pl-1 border-b-2 border-gold-500 text-white focus:outline-none"
          style={{
            backgroundColor: "inherit",
            borderBottom: "2px solid goldenrod",
            boxShadow: "none",
          }}
          name="phone"
        />
        {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        
        <div className="flex justify-center items-center mb-5 w-[80px] mx-auto">
          <button
            className="text-white font-bold py-3 border border-black-500 rounded-xl mt-4 px-[60px] bg-gradient-to-r from-yellow-700 to-yellow-300 hover:bg-yellow-500 transition duration-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </div>
        <div className="flex justify-center">
          <p className="text-white">
            Remember your password?{" "}
            <Link to="/login" className="text-yellow-500 font-bold">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

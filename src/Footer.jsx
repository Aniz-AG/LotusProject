import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaDiceFour } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-my-gradient text-[#e5b80b] text-center py-4 sticky bottom-0 w-full z-1">
      <div className="grid grid-cols-5 gap-6 px-4"> {/* Added padding to the left and right */}
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => { navigate('/imp') }} className="flex flex-col items-center">
            <FaHome className="w-4 h-4" /> 
            <p className="text-[14px]">Home</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => { navigate('/histories') }} className="flex flex-col items-center">
            <FaHistory className="w-4 h-4" />
            <p className="text-[14px]">History</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => { navigate('/profile') }} className="flex flex-col items-center">
            <FaCircleUser className="w-4 h-4" />
            <p className="text-[14px]">Profile</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => { navigate('/transaction') }} className="flex flex-col items-center">
            <FaBook className="w-4 h-4" />
            <p className="text-[14px]">Passbook</p>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => { navigate('/imp4') }} className="flex flex-col items-center">
            <FaDiceFour className="w-4 h-4" />
            <p className="text-[14px]">Bids</p>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

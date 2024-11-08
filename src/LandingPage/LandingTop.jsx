import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ICONS AND BACKGROUNDS/Transparent logo.png';
import apkDownload from "../assets/ICONS AND BACKGROUNDS/DownloadAPK_logo.png";
import addfund from "../assets/ICONS AND BACKGROUNDS/add fund.png";
import withdraw from "../assets/ICONS AND BACKGROUNDS/withdraw.png";
import gali from "../assets/ICONS AND BACKGROUNDS/gali.png";
import star from "../assets/ICONS AND BACKGROUNDS/starlineFinal.png";
import { IoMdDownload } from "react-icons/io";
import '../App.css';

function LandingTop() {
  const topStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    height: 'auto',
    width: 'auto',
  };

  const navigate = useNavigate();

  return (
    <>
      <div style={topStyle}>
        <div
          style={{
            background: 'linear-gradient(to bottom, rgb(5, 46, 25) 0%, rgb(5, 56, 39) 80%)',
            width: '100%',
            height: '120px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="rounded-b-[10px]"
        >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignSelf: 'bottom' }} className="translate-x-[20px]">
            <a href="https://sattamatkaofficials.com/uploads/images/lotus365matka_1730995020.apk" target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-bold shadow-emerald-200 shadow-md rounded-lg">
              <span className="p-2">Download App</span>
              <IoMdDownload className="text-white text-2xl" />
            </a>
          </div>
          <img
            src={logo}
            className="h-[70px]"
            alt="Logo"
            style={{
              flex: 1, height: '70%', width: 'auto', objectFit: 'contain', marginLeft: '40px'
            }}
          />
        </div>

        <div className="px-2">
          <div className="grid grid-cols-4 gap-4 px-2">
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <button onClick={() => navigate("/login")} className="flex flex-col items-center justify-center py-4">
                <img src={addfund} alt="Addfund Icon" className="w-[63px] h-[63px] sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-sm mb-1 shadow-sm" />
                <p className="font-bold text-black text-xs">AddFund</p>
              </button>

              <button onClick={() => navigate("/login")} className="flex flex-col items-center justify-center py-4">
                <img src={withdraw} alt="Withdraw Icon" className="w-[60px] h-[60px] sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-sm mb-[6px] translate-y-[2px] shadow-sm" />
                <p className="font-bold text-black text-xs m-0 p-0">Withdraw</p>
              </button>
            </div>

            <div className="col-span-2 mt-2">
              <button onClick={() => navigate("/login")} className="relative flex flex-col items-center justify-center py-4">
                <img src={gali} alt="Gali Icon" className="w-[180px] h-[58px] rounded-sm mb-1 shimmer shadow-md" />
                <p className="font-bold text-black text-xs m-0 p-0">Gali Disawar</p>
              </button>
            </div>
          </div>

          {/* Animated text section */}
          <div className="flex justify-center mb-2 overflow-hidden shadow-sm">
            <p className="animate-marquee whitespace-nowrap bg-purple text-black font-bold text-sm px-4">
            PLEASE DOWNLOAD ANDROID APPLICATION FOR FAST DEPOSIT AND FAST WITHDRAW (24×7)
            </p>
          </div>

          <div className="flex justify-center items-center pb-2">
            <button className="relative" onClick={() => navigate("/login")}>
              <img src={star} alt="Starline Icon" className="w-[335px] h-[60px] mt-0.75 shimmer shadow-md" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(LandingTop);

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Modal.css";
import SingleDigit from "./assets/ICONS AND BACKGROUNDS/SINGLE DIGIT.png"
import JodiDigit from './assets/ICONS AND BACKGROUNDS/JODI DIGIT.png'
import SinglePanna from './assets/ICONS AND BACKGROUNDS/SINGLE PANNA.png'
import DoublePanna from './assets/ICONS AND BACKGROUNDS/DOUBLE PANNA.png'
import TriplePanna from './assets/ICONS AND BACKGROUNDS/TRIPLE PANNA.png'
import HalfSangam from './assets/ICONS AND BACKGROUNDS/HALF SANGAM.png'
import FullSangam from './assets/ICONS AND BACKGROUNDS/FULL SANGAM.png'
import spdptp from "./assets/ICONS AND BACKGROUNDS/SP DP TP.png"
import spmotor from "./assets/ICONS AND BACKGROUNDS/SP MOTOR.png";
import dpmotor from "./assets/ICONS AND BACKGROUNDS/DP MOTOR.png";
function Game() {
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  const cardStyle = {
    width: "300px",
    padding: "0px",
  };

  const backStyle = {
    background: 'white',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  }

  const { gameId, openTime, gameName } = useLocation().state;
  const [isModalOpen,setModalOpen]=useState(false);
  const [modalMessage,setModalMessage]=useState("");

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier.toLowerCase() === 'pm' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier.toLowerCase() === 'am' && hours === '12') {
      hours = '00';
    }
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  };

  // Convert openTime to 24-hour format
  const openTime24Hour = convertTo24Hour(openTime);
  console.log("Converted open time (24-hour):", openTime24Hour);
  
    // Get the current clock time (HH:MM)
    const currentTime = new Date();
    const currentHours = currentTime.getHours().toString().padStart(2, '0');
    const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentTimeOnly = `${currentHours}:${currentMinutes}`;
  
    console.log("Current time (HH:MM):", currentTimeOnly);

  const checkTimeAndNavigate=(route,panaName)=>{
    if(openTime24Hour<=currentTimeOnly){
      const notify=toast(`Bidding is closed for ${panaName}`);
      notify();
    }
    else{
      navigate(route, { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: panaName } });
    }
  }
  const imgStyle = {
    width: "120px",
    height: "115px", 
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0, 255, 0, 0.7)",
  };

  return (
    <>
      <div className="pl-2 flex justify-center -mt" style={backStyle}>
        <div className="grid grid-cols-2 gap-2 mt-10 font-bold" style={cardStyle}>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/single", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Single Digit' } });
                }
              }}>
              <img src={SingleDigit} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                checkTimeAndNavigate("/jodi", 'Jodi Digit');
              }}>
              <img src={JodiDigit} style={imgStyle} className="rounded-xl" />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/singlepana", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Single Pana' } });
                }
              }}>
              <img src={SinglePanna} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/doublepana", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Double Pana' } });
                }
              }}>
              <img src={DoublePanna} style={imgStyle} className="rounded-xl" />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/tripplepana", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Triple Pana' } });
                }
              }}>
              <img src={TriplePanna} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
          <button
              onClick={() => {
                checkTimeAndNavigate("/halfsangam", 'Half Sangam');
              }}>
              <img src={HalfSangam} style={imgStyle} className="rounded-xl" />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                checkTimeAndNavigate("/fullsangam", 'Full Sangam');
              }}>
              <img src={FullSangam} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/spdptp", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'SP DP TP' } });
                }
              }}>
              <img src={spdptp} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/spmotor", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'SP MOTOR' } });
                }
              }}>
              <img src={spmotor} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/dpmotor", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'DP MOTOR' } });
                }
              }}>
              <img src={dpmotor} style={imgStyle} className="rounded-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
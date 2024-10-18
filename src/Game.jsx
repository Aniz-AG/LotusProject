import { BiArrowBack } from "react-icons/bi";
import url1 from "./Images/single_digit.png";
import url2 from "./Images/jodi_digit.png";
import url3 from "./Images/single_panna.png";
import url4 from "./Images/double_panna.png";
import url5 from "./Images/triple_panna.png";
import url6 from "./Images/half_sangam.png";
import url7 from "./Images/full_sangam.png";
import topBackground from "./Images/bg.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { FaDiceOne } from "react-icons/fa6";
import { CgCardSpades } from "react-icons/cg";
import { TbCards } from "react-icons/tb";
import { PiCardsBold } from "react-icons/pi";
import { MdHourglassFull } from "react-icons/md";
import { MdHourglassBottom } from "react-icons/md";
import { FaDice } from "react-icons/fa6";
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

  const imgStyle = {
    width: "120px",
    height: "115px", 
    borderRadius: "10px", // Slight rounding for a smooth look
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
                if (gameId) {
                  console.log(gameId)
                  navigate("/jodi", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Jodi Digit' } });
                }
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
                if (gameId) {
                  console.log(gameId)
                  navigate("/halfsangam", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Half Sangam' } });
                }
              }}>
              <img src={HalfSangam} style={imgStyle} className="rounded-xl" />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl">
            <button
              onClick={() => {
                if (gameId) {
                  console.log(gameId)
                  navigate("/fullsangam", { state: { gameId: gameId, openTime: openTime, gameName: gameName, pana: 'Full Sangam' } });
                }
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
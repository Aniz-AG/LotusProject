import logo from "./Images/logo.png";
import { BiArrowBack } from "react-icons/bi";
import topBackground from './Images/bg.png';
import { useNavigate } from "react-router-dom";
import useHowtoPlay from "./Hooks/useHowtoPlay";
import { useState, useEffect } from "react";

function Htp() {
  const [status, setStatus] = useState(false);
  const [gameRates, setGameRates] = useState([]);
  const navigate = useNavigate();

  const pageStyle = {
    backgroundColor: '#013220',
    minHeight: '100vh',
    padding: '20px',
    color: 'white',
  };

  const contentStyle = {
    backgroundColor: '#1a3d2f',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const youtubeContainerStyle = {
    backgroundColor: '#ffcc00',
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px 0',
    color: 'black',
    fontWeight: 'bold',
  };

  const youtubeLinkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
  };

  const back = () => {
    navigate("/imp");
  };

  const resinfo = useHowtoPlay();
  console.log("How to play response:", resinfo);

  useEffect(() => {
    if (resinfo && resinfo.result) {
      setStatus(true);
      setGameRates(resinfo.result);
    }
  }, [resinfo]);

  const renderHowToPlayContent = () => {
    return {
      __html: (resinfo?.content && resinfo.content.length > 0)
        ? resinfo.content[0].how_to_play_content || ""
        : ""
    };
  };

  const videoLink = resinfo?.content?.[0]?.video_link; // Safe access to video_link

  return (
    <div className="relative" style={pageStyle}>
      <div className="font-bold flex items-center justify-center text-2xl mt-2 mb-2">
        <h1>How To Play</h1>
      </div>

      {/* Content section */}
      <div className="flex items-center justify-center shadow-md" style={contentStyle}>
        <div
          className="text-white flex flex-col p-5"
          dangerouslySetInnerHTML={renderHowToPlayContent()}
        />
      </div>

      {/* YouTube link section with a yellow background */}
      <div className="flex justify-center">
        <div style={youtubeContainerStyle}>
          {videoLink && ( // Check if videoLink exists before rendering
            <a
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              style={youtubeLinkStyle}
            >
              Watch How to Play Tutorial on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Htp;

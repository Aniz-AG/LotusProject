import Navbar from "./Navbar";
import Top from "./Top";
import GameFRONT from "./GameFRONT";
import topBackground from './Images/bg.png';
import { Provider } from "react-redux";
import Starline from "./Starline";
import StarlineGame from "./StarlineGame";


function IMP2(){
  const topStyle = {
    // backgroundImage: `url(${topBackground})`,
    backgroundSize: 'cover',
    height: 'auto',
    width: '100%',
    paddingBottom: '20px',
    overflowY: 'scroll'
};

    return (
        <>
        <div className="">
        <div className=" z-4">
        <Starline/>
        </div>
        
      <div className="" style={topStyle}>

        <StarlineGame/>
        {/* <GameFRONT/> */}

      </div>
      </div>

        </>
    );
}

export default IMP2;
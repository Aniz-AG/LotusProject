import Navbar from "./Navbar";
import Top from "./Top";
import GameFRONT from "./GameFRONT";
import topBackground from './Images/bg.png';
import { Provider } from "react-redux";
import Starline from "./Starline";
import StarlineGame from "./StarlineGame";
import GALIRATES from "./GALIRATES";
import GALIGAME from "./GALIGAME";


function GALIIMP(){
    const topStyle = {
        // backgroundImage: `url(${topBackground})`,
        backgroundSize: 'cover',
        height: 'auto', // Set the height of the div
        width: '100%', // Set the width of the div
        // paddingBottom:'150px'
      };
    return (
        <>
        <div className="relative">
        <div className="sticky top-0 mb-7">
        <GALIRATES/>
        </div>
        
      <div className="" style={topStyle}>

        <GALIGAME/>
        {/* <GameFRONT/> */}

      </div>
      </div>

        </>
    );
}

export default GALIIMP;
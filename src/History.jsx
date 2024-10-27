
import { useNavigate } from "react-router-dom";

const History = ()=>{
    const navigate = useNavigate();
    return(<>
    
    <div className="font-bold flex items-center justify-center text-2xl mt-2 mb-2">
    <h1>History</h1>
  </div>
      <div className="flex flex-col  items-center justify-center" >
      <div onClick={() => navigate("/AddFundHistroy")} className="bg-my-gradient text-white  mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Deposit History</p> </button> </div>
      <div onClick={() => navigate("/transaction")} className="bg-my-gradient text-white mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Wallet History</p> </button> </div>
      <div onClick={() => navigate("/imp4")} className="bg-my-gradient text-white  mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Main Bid-History</p> </button> </div>
      <div onClick={() => navigate("/imp3")} className="bg-my-gradient text-white  mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Main Win-History</p> </button> </div>
      <div onClick={() => navigate("/imp5")} className="bg-my-gradient text-white mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Starline Bid-History</p> </button> </div> 
      <div onClick={() => navigate("/imp6")} className="bg-my-gradient text-white  mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Starline Win-History</p> </button> </div>
      <div onClick={() => navigate("/impbid")} className="bg-my-gradient text-white  mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Gali Bid-History</p> </button> </div> 
      <div onClick={() => navigate("/impwin")} className="bg-my-gradient  text-white mb-4 h-10 w-80 border flex items-center justify-evenly rounded z-4 hover:shadow-lg shadow-md"><button  className="flex  py-2 px-1  "><p className="font-bold">Gali Win-History</p> </button> </div>
  </div>
    </>);

}

export default History;
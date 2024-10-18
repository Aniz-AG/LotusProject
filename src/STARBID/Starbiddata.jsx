function Starbiddata({ data }) {
    return (
      <>
        <div className="mt-5">
          
  
          {/* Conditional rendering using logical && operator */}
          {data.pana === "Single Digit" && (
            <div className="bg-white border-black  text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border rounded-2xl  pl-4 pr-5">
            <div className="flex flex-col">
            <p className="font-bold"> {data.game_name}</p>
              <p>
              <span className="font-bold">Digit:</span>  {data.digits}
              </p>
              <p>{/* Any additional content you want to render */}</p>
              <p><span className="font-bold">Date:</span> {data.bid_date}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="font-bold">{data.pana}</p>
              <p className="font-bold">{data.points} pts</p>
            </div>
          </div>
          )}
  
  
          {data.pana === "Single Pana" && (
            <div className="bg-white border-black  text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border rounded-2xl  pl-4 pr-5">
            <div className="flex flex-col">
            <p className="font-bold"> {data.game_name}</p>
              <p>
              <span className="font-bold">Digit:</span>  {data.digits}
              </p>
              <p>{/* Any additional content you want to render */}</p>
              <p><span className="font-bold">Date:</span> {data.bid_date}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="font-bold">{data.pana}</p>
              <p className="font-bold">{data.points} pts</p>
            </div>
          </div>
          )}
  
          {data.pana === "Double Pana" && (
            <div className="bg-white border-black  text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border rounded-2xl  pl-4 pr-5">
            <div className="flex flex-col">
            <p className="font-bold"> {data.game_name}</p>
              <p>
              <span className="font-bold">Digit:</span>  {data.digits}
              </p>
              <p>{/* Any additional content you want to render */}</p>
              <p><span className="font-bold">Date:</span> {data.bid_date}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="font-bold">{data.pana}</p>
              <p className="font-bold">{data.points} pts</p>
            </div>
          </div>
          )}
  
          {data.pana === "Triple Pana" && (
            <div className="bg-white border-black  text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border rounded-2xl  pl-4 pr-5">
            <div className="flex flex-col">
            <p className="font-bold"> {data.game_name}</p>
              <p>
              <span className="font-bold">Digit:</span>  {data.digits}
              </p>
              <p>{/* Any additional content you want to render */}</p>
              <p><span className="font-bold">Date:</span> {data.bid_date}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="font-bold">{data.pana}</p>
              <p className="font-bold">{data.points} pts</p>
            </div>
          </div>
          )}
  
        </div>
      </>
    );
  }
  
  export default Starbiddata;
  
function Windata({ data }) {
  const formatDate = (dateStr) => {
    // Create a new Date object from the given string
    const date = new Date(dateStr);
  
    // Format the date to the desired format: "8 Nov, 2024"
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  return (
    <>
      <div className="mb-5">
        {/* Conditional rendering using logical && operator */}
        {data.pana === "Single Digit" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p> <span className="font-bold">Date:</span>{formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}

        {data.pana === "Jodi Digit" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p>{/* Any additional content you want to render */}</p>
            <p> <span className="font-bold">Date:</span>  {formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}

        {data.pana === "Single Pana" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p>{/* Any additional content you want to render */}</p>
            <p> <span className="font-bold">Date:</span>  {formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}

        {data.pana === "Double Pana" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p>{/* Any additional content you want to render */}</p>
            <p> <span className="font-bold">Date:</span>  {formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}

        {data.pana === "Tripple Pana" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p>{/* Any additional content you want to render */}</p>
            <p> <span className="font-bold">Date:</span>  {formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}

        {data.pana === "Half Sangam" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p>{/* Any additional content you want to render */}</p>
            <p> <span className="font-bold">Date:</span>  {formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}

        {data.pana === "Full Sangam" && (
          <div className="bg-white text-black mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5">
          <div className="flex flex-col">
          <p className="font-bold"> {data.game_name}</p>
          <p>
              <span className="font-bold">{data.session} Digit : </span>{data.digits}
            </p>
            <p><span className="font-bold">Session: </span> {data.session}</p>
            <p>{/* Any additional content you want to render */}</p>
            <p> <span className="font-bold">Date:</span>  {formatDate(data.wining_date)}</p>
          </div>
          <div className="flex flex-col justify-around">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold">{data.amount} pts</p>
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Windata;

function Biddata({ data }) {
  // Define a mapping of pana values to colors
  const colorScheme = {
    "Single Digit": "bg-blue-100 text-blue-800",
    "Jodi Digit": "bg-green-100 text-green-800",
    "Single Pana": "bg-yellow-100 text-yellow-800",
    "Double Pana": "bg-red-100 text-red-800",
    "Triple Pana": "bg-purple-100 text-purple-800",
    "Half Sangam": "bg-orange-100 text-orange-800",
    "Full Sangam": "bg-pink-100 text-pink-800",
  };

  // Get the color classes based on data.pana
  const colorClasses = colorScheme[data.pana] || "bg-white text-black"; // Default colors if pana not found

  return (
    <div className="mt-5">
      {/* Conditional rendering based on data.pana */}
      {data.pana && (
        <div className={`${colorClasses} mr-2 ml-4 z-2 -mt-1 p-1 flex justify-between align-middle border border-black rounded-t-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 pl-4 pr-5`}>
          <div className="flex flex-col">
            <p className="font-bold">{data.game_name}</p>
            <p>
              <span className="font-bold">{data.session} Digit:</span> {data.digits}
            </p>
            <p>
              <span className="font-bold">Session:</span> {data.session}
            </p>
            <p>
              <span className="font-bold">Date:</span> {data.bid_date}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">{data.pana}</p>
            <p className="font-bold text-red-500">{data.points} pts</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Biddata;

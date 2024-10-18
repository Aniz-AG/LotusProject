import React, { useState, useEffect } from "react";



const Timer = ({ closeTime }) => {

  // console.log("hello")

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes,setMinutes]=useState(0);
  const [secs,setSeconds]=useState(0);

  const calculateTimeLeft = () => {

    // const closeTimeWithoutSuffix = closeTime.replace(/\s[AaPp][Mm]$/, '');
    // const closeDateString = new Date().toLocaleDateString(); // Get current date as a string
    // const close = `${closeDateString}T${closeTimeWithoutSuffix}`;
    // const parts = close.split("T");
    // const dateParts = parts[0].split("/");
    // const timeParts = parts[1].split(":");
    // const formattedDateString = `${dateParts[2]}-${dateParts[0].padStart(2, "0")}-${dateParts[1].padStart(2, "0")}T${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}:00`;
    // let closeDate=new Date(`${dateParts[2]}-${dateParts[0].padStart(2, "0")}-${dateParts[1].padStart(2, "0")}T${timeParts[0].padStart(2, "0")}:${timeParts[1].padStart(2, "0")}:00`);
    // if (closeTime.match(/[Pp][Mm]$/)) {
    //   const closeHours = closeDate.getHours();
    //   closeDate.setHours(closeHours === 12 ? 12 : closeHours + 12);
    // }


    // const closeMillisec = Date.parse(closeDate);
    const totalTime=(closeTime*1000)-Date.now();
    setDays(Math.floor(totalTime/(1000*60*60*24)))
    setHours(Math.floor(totalTime / (1000 * 60 * 60)%24));
    setMinutes(Math.floor((totalTime/1000/60)%60));
    setSeconds(Math.floor((totalTime /1000 )%60));

  };



  useEffect(() => {
    const timer = setInterval(() => calculateTimeLeft(), 1000);
    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };


  return (
    <span>
      {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(secs)}`}
    </span>
  );
};

export default Timer;

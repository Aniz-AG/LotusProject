import { useState, useEffect } from "react";

function useCarosuel() {
  const [res, setRes] = useState(null);

 
  const fetchData = async (unique) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "ci_session=7c38fc1fc455fca9846d688fb8343f5c7ea71bee"
      );

      const raw = JSON.stringify({
        env_type: "Prod",
        app_key: "jAFaRUulipsumXLLSLPFytYvUUsgfh",
        unique_token: unique,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://lotus365matka.in/api-get-slider-images",
        requestOptions
      );
      const result = await response.json();
      // console.log('hi');
      // console.log(result);

      // Update state with the fetched data
      setRes(result);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    if(res===null){
      // console.log("hii "+res);
      fetchData();
    }
    
  }, []);


  return res;
}

export default useCarosuel;

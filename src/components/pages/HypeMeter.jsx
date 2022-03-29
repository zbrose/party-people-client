import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function HypeMeter({ details }) {
  const eventId = details._id;
  // setHype(details.hype)
  const [refresh, setRefresh] = useState();
  const [HypeCount, setHypeCount] = useState(details.hype);
  const [displayCount, setDisplayCount]= useState();
  const [numCount,setNumCount] = useState(details.hype)
//   let numCount = details.hype

  function hypeThis() {
    axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${eventId}/hype`
    );

        setNumCount(numCount+1)
        // numCount++
        console.log(numCount)
        

    // setNewHype(newDetails.hype)
  }

  const [count, setCount] = useState();

  // Function to increment count by 1
  const incrementCount = () => {
    // Update state with incremented value
    setCount(details)
    setCount(count + 1);
    axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${eventId}/hype`
      );

};

  return (
    <>
      
      {/* <h1>{details.hype}</h1> */}
      <br></br>
      <button onClick={hypeThis}>HYPE THIS EVENT</button>

      {/* <div className="app">
      <button onClick={incrementCount}>Click Here</button>
      {count}
    </div> */}
    <h1>{numCount}</h1>
    </>
  );
}

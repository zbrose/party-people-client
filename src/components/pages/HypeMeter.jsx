import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



export default function HypeMeter({ details }) {
  const eventId = details._id;
  // setHype(details.hype)
  const [refresh, setRefresh] = useState();
  const [HypeCount, setHypeCount] = useState(details.hype);
  const [displayCount, setDisplayCount] = useState();
  const [numCount, setNumCount] = useState(details.hype);
  //   let numCount = details.hype

  function hypeThis() {
    axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${eventId}/hype`
    );

        setNumCount(numCount+1)
        // numCount++

    // setNewHype(newDetails.hype)
  }

  const [count, setCount] = useState();

  // Function to increment count by 1
  const incrementCount = () => {
    // Update state with incremented value
    setCount(details);
    setCount(count + 1);
    axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${eventId}/hype`
    );
  };

  let meter;

  const displayHype = () => {
    if (numCount < 25) {
      meter = <img src="images/low.png" alt="" style={{ width: 250, height: 250 }} />;
    } else if (numCount < 50) {
      meter = (
        <h1>
          {" "}
          <img src="images/low.png" alt="" style={{ width: 250, height: 250 }} />
        </h1>
      );
    } else if (numCount < 75) {
      meter = (
        <h1>
          {" "}
          <img src="images/low.png"alt="" style={{ width: 250, height: 250 }} />
        </h1>
      );
    } else if (numCount < 100) {
      meter = (
        <h1>
          {" "}
          <img src="images/low.png" alt="" style={{ width: 250, height: 250 }} />
        </h1>
      );
    } else if (numCount > 99) {
      meter = (
        <h1>
          {" "}
          <img src="images/low.png" alt="" style={{ width: 250, height: 250 }} />
        </h1>
      );
    }
}
displayHype()

  return (
    <div id="hype">
      {/* <h1>{details.hype}</h1> */}

      {/* <div className="app">
      <button onClick={incrementCount}>Click Here</button>
      {count}
    </div> */}
      <h3 id="numCounter" className="white-font BebasNeue">{numCount > 100 ? "ITS OUTTA CONTROL" : numCount}</h3>
      {meter}
    <button id="hypeThisEvent" className="BebasNeue" onClick={hypeThis}>HYPE THIS EVENT</button>
    </div>
  );
}

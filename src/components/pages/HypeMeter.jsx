import React, { useState } from "react"
import axios from "axios"



export default function HypeMeter({ details }) {
  const eventId = details._id
  // setHype(details.hype)
  const [numCount, setNumCount] = useState(details.hype)
  //   let numCount = details.hype

  function hypeThis() {
    axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${eventId}/hype`
    )
    setNumCount(numCount + 1)
  }

  let meter

  const displayHype = () => {
    if (numCount < 25) {
      meter = <img src="/images/low.png" alt="" style={{ width: 250, height: 250 }} />
    } else if (numCount < 50) {
      meter = (
        <h1>
          {" "}
          <img src="/images/semihype.png" alt="" style={{ width: 250, height: 250 }} />
        </h1>
      )
    } else if (numCount < 75) {
      meter = (
        <h1>
          {" "}
          <img src="/images/medium.png"alt="" style={{ width: 250, height: 250 }} />
        </h1>
      )
    } else if (numCount < 100) {
      meter = (
        <h1>
          {" "}
          <img src="/images/high.png" alt="" style={{ width: 250, height: 250 }} />
        </h1>
      )
    } else if (numCount < 125 ) {
      meter = (
        <h1>
          {" "}
          <img src="/images/ultra.png" alt="" style={{ width: 250, height: 250 }} />
        </h1>
      )
    }
    else if (numCount > 124) {
        meter = (
          <h1>
            {" "}
            <img src="/images/explosion.gif" alt="" style={{ width: 250, height: 250 }} />
          </h1>
        )
      }
  }
  displayHype()

  return (
    <div id="hype">
      <h3 id="numCounter" className="white-font BebasNeue">{numCount > 100 ? "It's about to blow!" : numCount}</h3>
      {meter}
    <button id="hypeThisEvent" className="BebasNeue create-event-button " onClick={hypeThis}>HYPE THIS EVENT</button>
    </div>
  )
}

import { useRef, useEffect, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import axios from "axios";
let accessToken =
  "pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ";

// REACT_APP_MAPBOX_TOKEN

export default function Map({ details }) {
  const [address, setAddress] = useState({});
  const [latitude,setLatitude] = useState({});
  const [longitude,setLongitude] = useState({})

  useEffect(() => {
    async function addressfy(e) {
      const preSplit = e;
      const split = preSplit.split(" ");
      const formattedAddress = split.join("%20");
      const addressData = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedAddress}.json?bbox=-180%2C-90%2C180%2C90&limit=1&types=place%2Cpostcode%2Caddress&autocomplete=true&routing=true&worldview=us&access_token=pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ`
      );
      console.log(addressData.data.features[0].center);
      setAddress(addressData.data.features[0].center)
      const splitCords= (addressData.data.features[0].center.split(' '))
      console.log(splitCords)
      ;
    }
    addressfy(details.address);
  }, []);

  const [viewport, setViewPort] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
  });
  return (
    <ReactMapGl
      {...viewport}
      mapboxAccessToken={
        "pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ"
      }
      onMove={(evt) => setViewPort(evt.viewState)}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker key={"party"} latitude={45.4211} longitude={-75.6903}>
        <div>
          <button className="marker-button">
            <img
              src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
              alt=""
            />
          </button>
        </div>
      </Marker>
    </ReactMapGl>
  );
}

import { useRef, useEffect, useState } from "react";
import ReactMapGl, { Marker, GeolocateControl } from "react-map-gl";
import axios from "axios";
let accessToken =
  "pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ";

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px",
};

// REACT_APP_MAPBOX_TOKEN

export default function Map({ details }) {
  const [address, setAddress] = useState({});
  const [latitude, setLatitude] = useState(33.4554);
  const [longitude, setLongitude] = useState(-111.967472);


  useEffect(() => {
      async function addressfy(e) {
        const preSplit = e;
        const split = preSplit.split(" ");
        const formattedAddress = split.join("%20");
        const addressData = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedAddress}.json?bbox=-180%2C-90%2C180%2C90&limit=1&types=place%2Cpostcode%2Caddress&autocomplete=true&routing=true&worldview=us&access_token=pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ`
        );
        setLongitude(addressData.data.features[0].center[0]);
        setLatitude(addressData.data.features[0].center[1]);
        console.log(addressData.data.features[0]);
        console.log(latitude, longitude);
        setViewPort({
          latitude: latitude,
          longitude: longitude,
          zoom: 15,
        });
      }
      addressfy(details.address);
  }, []);

  const [viewport, setViewPort] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 10,
  });

  console.log(latitude, longitude);
  return (
      <>
    {latitude ? (
    <div style={{ margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        GeoLocator: Click the Geolocator to Find Your Location
      </h1>
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={
          "pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ"
        }
        onMove={(evt) => setViewPort(evt.viewState)}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker key={"party"} latitude={latitude} longitude={longitude}>
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
    </div>
  ):('No latitude')}</>)}

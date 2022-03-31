import { useEffect, useState } from "react";
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
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [viewport, setViewPort] = useState({
    latitude: 33.4554,
    longitude: -111.967472,
    zoom: 10,
  });

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
      setViewPort({
        latitude: addressData.data.features[0].center[1],
        longitude: addressData.data.features[0].center[0],
        zoom: 15,
      });
    }
    addressfy(details.address);
  }, []);

  return (
    
        <div className="row no-gutter shadow">
          {latitude ? (
            <div>

              <ReactMapGl
                {...viewport}
                mapboxAccessToken={
                  "pk.eyJ1IjoidHJpc3RvbnBhbGFjaW9zIiwiYSI6ImNsMWF5bXJwZTJheDIzbHYwMnMzZnZucmcifQ.dZGAzZPAmn39U28QyzwPVQ"
                }
                onMove={(evt) => setViewPort(evt.viewState)}
                style={{ width: 500, height: 400 }}
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
          ) : (
            "Address not found"
          )}
        </div>
    
  );
}

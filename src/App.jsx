import "./App.css";
/* image */
import sun from "./assets/sun.png";
import search_icon from "./assets/search.png";
import storm from "./assets/storm.png";
import snow from "./assets/snow.png";
import drizzleIcon from "./assets/weather.png";
import wind from "./assets/wind.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { flushSync } from "react-dom";

const WetherDetails = ({ icon, temp, location, country, lat, log }) => {
  return (
    <>
      <div className="images">
        <img src={icon} alt="image_of_Show" />
      </div>
      <div className="temp">
        {temp} <span className="degree">℃</span>
      </div>
      <div className="location">{location}</div>
      <div className="country">{country}</div>
      <div className="lat-log">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>

        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
    </>
  );
};

function App() {
  const [icon, seticon] = useState(snow);
  const [temp, setTemp] = useState(0);
  const [location, setlocation] = useState("");
  const [country, setcountry] = useState("");
  const [lat, setlat] = useState(0);
  const [lot, setlot] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [loading, setloading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [error,setError] = useState(null)
  
  const weathericons ={
    "01d": sun,
    "01n":sun,
    "02n":sun,
    "02d":sun,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":storm,
    "09d":storm,
    "09n":storm,
    "10d":storm,
    "10n":storm,
    "13d":snow,
    "13n":snow,
    };

  const handlechange = (e) => {
    setCity(e.target.value);
  };

  useEffect(()=>{
    search()
  },[])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  let KEY = "65569f2e6f5561add3089cb951956987";

  const search = async() => {
    setloading(true)
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=Metric`;
    try {
      let res = await fetch(api);
      let data = await res.json();
      // console.log(data);
      if(data.cod === "404"){
        console.log("City not Founded");
        setCityNotFound(true)
        setloading(false)
        return;
      } 
      setTemp((Math.floor(data.main.temp)));
      setlocation(data.name);
      setlat(data.coord.lat);
      setlot(data.coord.lon);
      setcountry(data.sys.country);
      const weathermapicon = data.weather[0].icon
      seticon(weathericons[weathermapicon] || sun)
      setCityNotFound(false)
    } catch (error) {
      console.log("some thing check in APi");
      setError("SomeThing Worng on a Search")
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="weather-icon">
             {!loading && !error && !cityNotFound &&  <WetherDetails
              icon={icon}
              temp={temp}
              location={location}
              country={country}
              lat={lat}
              log={lot}
            />}
            {loading && <div className="loading" >Loading...</div>}
            {error && <div className="error">{error}</div>}
            {cityNotFound && <div className="citynotfounded">City Not Founded</div>}
           
          </div>
          <div className="input-container">
            <input
              type="text"
              className="citynames"
              placeholder="Search City"
              value={city}
              onChange={handlechange}
              onKeyDown={handleKeyDown}
            />
            <div
              className="search-icon"
              onClick={() => {
                search();
              }}
            >
              <img src={search_icon} width={19} alt="" />
            </div>
          </div>
          <div className="copyrights">
            
            
            <p>Design By Sanjai Kumar</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

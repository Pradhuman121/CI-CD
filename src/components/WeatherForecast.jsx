import React, { useState, useEffect } from "react";
import sunrise from "./sunrise.png";
import sunset from "./sunset.png";
import co from "./co2.png";
import no2 from "./no2.png";
import so2 from "./so2.png";
import o3 from "./ozone.png";
import pm2_5 from "./pm2_5.png";
import pm10 from "./pm10.png";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const [location, setLocation] = useState("Gurgaon");

  let getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  let showPosition = (position) => {
    let coordinates = `${position.coords.latitude}&${position.coords.longitude}`;
    setLocation(coordinates);
  };

  let changeLocation = () => {
    let newlocation = document.getElementById("location").value;
    setLocation(newlocation);
    document.getElementById("location").value = "";
  };

  let changeLocationAndError = () => {
    changeLocation();
    setError(false);
  };

  let currentHour = () => {
    const d = new Date();
    let hour = d.getHours();
    return hour;
  };

  useEffect(() => {
    // URL to fetch weather data
    getLocation();
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=yes&alerts=yes`;

    // Fetch data using axios
    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data); // Store data in state
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError("Error fetching data");
        setLoading(false); // Set loading to false
      }); // eslint-disable-next-line
  }, [location]);

  // Render loading state, error, or weather data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <div className="flex items-center justify-center bg-slate-200 h-16 w-full">
          <div className="flex h-10">
            <input
              className="outline-none p-2 w-56 text-slate-900 bg-slate-400 rounded-s-md"
              id="location"
            />
            <button
              className="bg-slate-800 text-slate-200 p-2 rounded-e-md"
              onClick={changeLocationAndError}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-red-400 m-4 p-4 font-bold text-center rounded-xl min-w-64">
            Location Not Found, Please try again.
            <br />
            Problem : {error}
          </div>
        </div>
      </>
    );
  }

  let time = `${
    Number(
      weatherData.forecast.forecastday[0].hour[currentHour()].time.slice(11, 13)
    ) % 12
  } ${
    Number(
      weatherData.forecast.forecastday[0].hour[currentHour()].time.slice(11, 13)
    ) > 11
      ? "pm"
      : "am"
  }`;
  return (
    <div className="bg-slate-100">
      <div className="flex items-center justify-center bg-slate-200 h-16 w-full">
        <div className="flex h-10">
          <input
            className="outline-none p-2 w-56 text-slate-900 bg-slate-400 rounded-s-md"
            id="location"
          />
          <button
            className="bg-slate-800 text-slate-200 p-2 rounded-e-md font-bold"
            onClick={changeLocation}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center my-4">
        <div className="flex bg-slate-800 text-slate-200 w-3/4 p-4 rounded-t-xl">
          <div className="w-1/2">
            <h1>Weather Forecast for {weatherData.location.name}</h1>
            <h3>
              {weatherData.location.region}, {weatherData.location.country}
            </h3>
            <br />
            <h4>Current Temperature: {weatherData.current.temp_c}°C</h4>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="bg-slate-900 w-24 flex flex-col items-center h-full justify-center rounded-xl">
              <img
                src={`https:${
                  weatherData.forecast.forecastday[0].hour[currentHour()]
                    .condition.icon
                }`}
                alt="weather icon"
              />
              <p className="text-center pb-2 font-bold">
                {time === "0 pm" ? "12 pm" : time}
                <br />
                {
                  weatherData.forecast.forecastday[0].hour[currentHour()]
                    .condition.text
                }
              </p>
            </div>
          </div>
        </div>
        <div className="flex bg-slate-800 w-3/4 p-2 pb-4 rounded-b-xl">
          <div className="flex font-bold flex-wrap text-center bg-slate-900 text-slate-200 w-1/2 p-2 mx-2 rounded-xl items-center justify-center">
            Sunries <br />
            {weatherData.forecast.forecastday[0].astro.sunrise}
            <img src={sunrise} alt="sunrise" className="h-12 m-2" />
          </div>
          <div className="flex font-bold flex-wrap text-center bg-slate-900 text-slate-200 w-1/2 p-2 mx-2 rounded-xl items-center justify-center">
            Sunset <br />
            {weatherData.forecast.forecastday[0].astro.sunset}
            <img src={sunset} alt="sunset" className="h-12 m-2" />
          </div>
        </div>
        <h2 className="bg-slate-800 font-bold text-slate-200 w-3/4 rounded-xl p-4 mt-4">
          Air-Quality Index
        </h2>
        <div className="flex justify-center items-center mt-4 w-3/4 bg-slate-800 p-4 rounded-xl">
          <div className="overflow-auto flex">
            <div className="flex flex-col text-center bg-slate-900 text-slate-200 h-36 min-w-32 p-2 m-2 rounded-xl items-center justify-center">
              <p className="font-bold">PM 2.5</p>
              <img src={pm2_5} alt="pm2_5" className="h-10 m-2" />
              {Number(
                weatherData.current.air_quality.pm2_5
              ).toFixed(2)}
            </div>
            <div className="flex flex-col text-center bg-slate-900 text-slate-200 h-36 min-w-32 p-2 m-2 rounded-xl items-center justify-center">
              <p className="font-bold">PM 10</p>
              <img src={pm10} alt="pm10" className="h-10 m-2 invert" />
              {Number(
                weatherData.current.air_quality.pm10
              ).toFixed(2)}
            </div>
            <div className="flex flex-col text-center bg-slate-900 text-slate-200 h-36 min-w-32 p-2 m-2 rounded-xl items-center justify-center">
              <p className="font-bold">CO</p>
              <img src={co} alt="co" className="h-10 m-2" />
              {Number(
                weatherData.current.air_quality.co
              ).toFixed(2)}
            </div>
            <div className="flex flex-col text-center bg-slate-900 text-slate-200 h-36 min-w-32 p-2 m-2 rounded-xl items-center justify-center">
              <p className="font-bold">
                NO<sub>2</sub>
              </p>
              <img src={no2} alt="no2" className="h-10 m-2" />
              {Number(
                weatherData.current.air_quality.no2
              ).toFixed(2)}
            </div>
            <div className="flex flex-col text-center bg-slate-900 text-slate-200 h-36 min-w-32 p-2 m-2 rounded-xl items-center justify-center">
              <p className="font-bold">
                O<sub>3</sub>
              </p>
              <img src={o3} alt="o3" className="h-10 m-2" />
              {Number(
                weatherData.current.air_quality.o3
              ).toFixed(2)}
            </div>
            <div className="flex flex-col text-center bg-slate-900 text-slate-200 h-36 min-w-32 p-2 m-2 rounded-xl items-center justify-center">
              <p className="font-bold">
                SO<sub>2</sub>
              </p>
              <img src={so2} alt="so2" className="h-10 m-2" />
              {Number(
                weatherData.current.air_quality.so2
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-2">
        <h2 className="bg-slate-800 font-bold text-slate-200 w-3/4 rounded-xl p-4 mb-4">
          24-Hour Forecast
        </h2>

        <div className="w-3/4 p-3 rounded-xl bg-slate-800">
          <div
            className="flex flex-col overflow-auto rounded-xl"
            id="hourly-data"
          >
            <div className="flex">
              {weatherData.forecast.forecastday[0].hour.map((hour, index) => {
                let time = `${Number(hour.time.slice(11, 13)) % 12} ${
                  Number(hour.time.slice(11, 13)) > 11 ? "pm" : "am"
                }`;
                return (
                  <>
                    <div
                      key={index}
                      className="bg-slate-900 text-slate-200 rounded-xl flex flex-col items-center justify-center p-2 m-2 min-w-32"
                    >
                      <div className="font-bold">
                        {time === "0 pm" ? "12 pm" : time}
                      </div>
                      <p>Temp: {hour.temp_c}°C</p>
                      <img
                        src={`https:${hour.condition.icon}`}
                        alt="weather icon"
                      />
                      <p>{hour.condition.text}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <h2 className="bg-slate-800 text-slate-200 w-3/4 rounded-xl p-4 mb-2 font-bold">
          3-Day Forecast:
        </h2>
        <div className="flex items-center justify-center md:py-1 py-3 px-3 w-3/4 bg-slate-800 mt-2 mb-4 rounded-xl">
          <div className="md:grid md:grid-cols-3 md:gap-3 flex w-full md:place-items-center overflow-auto">
            {weatherData.forecast.forecastday.map((day, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center min-w-32 bg-slate-900 w-full text-slate-200 m-2 p-2 rounded-xl pb-7 min-h-64 text-center"
              >
                <br />
                <h4 className="font-bold">Date : {day.date}</h4>
                <p>
                  Max Temp: {day.day.maxtemp_c}°C
                  <br />
                  Min Temp: {day.day.mintemp_c}°C
                </p>
                <img
                  src={`https:${day.day.condition.icon}`}
                  alt="weather icon"
                />
                <p>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

import "./App.css";
import WeatherForecast from "./components/WeatherForecast.jsx";
import Navbar from "./components/Navbar.jsx";
import LottieAnimation from "./components/LottieAnimation.jsx";

function App() {
  return (
    <>
      <LottieAnimation/>
      <Navbar/>
      <WeatherForecast/>
    </>
  );
}

export default App;

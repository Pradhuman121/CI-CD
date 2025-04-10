import React from "react";
import Lottie from "react-lottie";
import animationData from "./AnimationData4.json"; // Import your Lottie JSON file
function Navbar() {
  const defaultOptions = {
    loop: true, // Animation will repeat
    autoplay: true, // Starts playing on load
    animationData: animationData, // Animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Maintains aspect ratio of animation
    },
  };

  return (
    <nav className="flex bg-slate-900 h-16 text-white text-center justify-center items-center">
      <div className="mt-2 ml">
        <Lottie options={defaultOptions} height={64} width={64} />
      </div>
      <h1 className="mr-5 text-4xl font-bold">Weather</h1>
    </nav>
  );
}
export default Navbar;

import React from "react";
import Lottie from "react-lottie";
import animationData from "./AnimationData2.json"; // Import your Lottie JSON file

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true, // Animation will repeat
    autoplay: true, // Starts playing on load
    animationData: animationData, // Animation JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Maintains aspect ratio of animation
    },
  };

  setTimeout(()=>{
    document.getElementById('loader').style.display = "none";
  },1500)

  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-800 absolute z-10" id="loader">
      <Lottie options={defaultOptions} height={600} width={600} />
    </div>
  );
};

export default LottieAnimation;

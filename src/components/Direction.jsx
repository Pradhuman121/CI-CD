import cardinal from "./image.svg";
import arrow from "./arrows.svg";
const Direction = () => {
  return (
    <div className="">
      <div className="border-2 flex items-center justify-center w-24 h-24">
        <img src={cardinal} alt="Direction image" className="absolute h-16" />
        <img
          src={arrow}
          alt="Arrow image"
          className="h-24 absolute opacity-70"
        />
      </div>
    </div>
  );
};
export default Direction;

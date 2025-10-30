import { useExperienceStore } from "../store/useExperienceStore";
import Button from "./Button";

const Navbar = () => {
  const { query, setQuery } = useExperienceStore();
  return (
    <div className="shadow-[0px_2px_16px_rgba(0,0,0,0.1)] fixed top-0 right-0 left-0 z-20 bg-main  px-[124px] py-4 flex lg:flex-row flex-col lg:gap-0 gap-3 items-center justify-between ">
      <div>
        <img className="w-[100px] height-[55px]" src="/logo2.svg" alt="Logo" />
      </div>
      <div className="flex items-center gap-4  flex-col sm:flex-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-input rounded-sm px-4 py-3 sm:w-[340px] ring:0 active:outline-0 focus:outline-0"
          placeholder="Search experiences"
        />
        {/* <button className="rounded-lg px-5 py-3 bg-button ">Search</button> */}
        <Button text="Search" onClick={() => setQuery(query)} />
      </div>
    </div>
  );
};

export default Navbar;

import { IoIosArrowForward } from "react-icons/io";
import { RxHome } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const PageLocation = ({ addresses }) => {
  const navigation = useNavigate();

  return (
    <div>
      <ul className="text-sm flex items-center gap-2 mb-4">
        <li
          onClick={() => navigation("/")}
          className="flex items-center gap-1 text-black/45 hover:text-[rgb(17,24,39)]"
        >
          <RxHome /> <span>Home</span>
        </li>
        {addresses.map((adr, idx) => (
          <li
            key={idx}
            className={`${
              addresses.length - 1 === idx
                ? "text-[rgb(17,24,39)] font-semibold"
                : "text-[rgb(75,85,99)]"
            } flex items-center gap-1`}
          >
            <IoIosArrowForward className="text-gray-400" /> {adr}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageLocation;

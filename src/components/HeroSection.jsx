import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const HeroSection = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-800 to-green-800 md:w-full p-5 rounded-md my-2 h-[88vh]">
        <div className="flex flex-col items-center justify-center gap-8 h-[89vh]">
          <span className="text-white text-4xl">
            Manage Your Tasks - Simple & Fast
          </span>
          <span className="flex items-center md:gap-3 gap-2 text-white md:text-xl text-sm">
            <MdPendingActions className="text-yellow-400" /> Pending{" "}
            <FaLongArrowAltRight /> <GiProgression className="text-blue-400" />{" "}
            Working <FaLongArrowAltRight />{" "}
            <IoCheckmarkDoneCircleOutline className="text-green-400" />{" "}
            Completed
          </span>
          <div className="flex flex-col gap-2">
            <span className="flex text-white items-center">
              <span className="flex items-center gap-4 mr-3">
                Fix API <FaLongArrowAltRight />
              </span>
              <span className="flex items-center gap-4 mr-3">
                Ahmed <FaLongArrowAltRight />
              </span>{" "}
              <span className="flex items-center gap-2">
                {" "}
                <MdPendingActions className="text-yellow-400" /> Pending{" "}
              </span>{" "}
            </span>

            <span className="flex text-white items-center">
              <span className="flex items-center gap-4 mr-3">
                Design <FaLongArrowAltRight />
              </span>
              <span className="flex items-center gap-4 mr-3">
                Amjad <FaLongArrowAltRight />
              </span>{" "}
              <span className="flex items-center gap-2">
                {" "}
                <IoCheckmarkDoneCircleOutline className="text-green-400" />{" "}
                Completed{" "}
              </span>{" "}
            </span>

            <span className="flex text-white items-center">
              <span className="flex items-center gap-4 mr-3">
                Testing <FaLongArrowAltRight />
              </span>
              <span className="flex items-center gap-4 mr-3">
                Junaid <FaLongArrowAltRight />
              </span>{" "}
              <span className="flex items-center gap-2">
                {" "}
                <GiProgression className="text-blue-400" /> Working{" "}
              </span>{" "}
            </span>
          </div>
          <Link to='/register' className="bg-blue-600 text-lg text-white cursor-pointer rounded-full px-10 py-4 hover:bg-blue-700">
            Sign up for free
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

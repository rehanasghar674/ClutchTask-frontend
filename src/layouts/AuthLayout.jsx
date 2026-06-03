import DNavbar from "../pages/DNavbar";
import { useTask } from "../context/TaskContext";
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md"

const AuthLayout = ({ children }) => {
  const { isOpen, toggle } = useTask();
  
  return (
    <div className="flex h-screen overflow-hidden relative">
      <div
        className={`fixed top-0 left-0 w-[250px] h-full lg:translate-x-0 transition-transform duration-300 bg-blue-950 ${isOpen ? "translate-x-0" : "-translate-x-full"} z-[100] lg:relative`}>
        <DNavbar />
      </div>

      <div className="fixed top-1 right-8 bg-blue-500 text-white px-1 py-0.5 rounded-md cursor-pointer mb-4 lg:hidden">
        {isOpen ? <MdCancel onClick={toggle} /> : <IoMenu onClick={toggle} />}
      </div>

      <div className={`flex-1 h-screen bg-gray-100 overflow-y-auto px-4 mt-8 md:mt-0 pb-3 sm:p-2`}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

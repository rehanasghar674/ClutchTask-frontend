import { MdOutlineCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <div className="bg-white border text-gray-500 border-gray-100 shadow-md rounded-md p-6 mt-5">
        <div className="flex justify-center">
          <p className="flex items-center">
            <MdOutlineCopyright className="me-1" /> Copyright All rights
            reserved {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

import { FaRegUser, FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { Link } from "react-router-dom";

const Features = () => {
  const featuresCards = [
    { icon: <FaTasks />, text: "Add tasks in seconds", subtext : 'Type & press enter - task saved instantly' },
    { icon: <FaRegUser />, text: "Assign to team members", subtext : '@username & dropdown, one click assign' },
    { icon: <GiProgression />, text: "See progress at a glance", subtext : 'Done / Doing / ToDo - clear status badges' },
  ];

  return (
    <>
      <h1 className="text-center text-gray-500 text-2xl mt-10">Features</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 my-6">
        {featuresCards.map((card, index) => (
          <div
            key={index}
            className="bg-white border text-gray-500 border-gray-100 shadow-md rounded-md p-3 flex flex-col items-center space-y-4 py-5">
            <p className="text-xl">{card.icon}</p>
            <hr className="text-gray-500" />
            <span>{card.text}</span>
            <span>{card.subtext}</span>
          </div>
        ))}
      </div>

      <div className="text-center mt-15 mb-10">
        <Link to='/register' className="bg-blue-600 text-lg text-white cursor-pointer rounded-full px-10 py-4 hover:bg-blue-700">Get Started</Link>
      </div>

    </>
  );
};

export default Features;

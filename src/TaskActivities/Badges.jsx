import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { GiProgression } from "react-icons/gi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";

export const StatusBadge = ({ status }) => {
    let config = {
      "to-do": {
        icon: <MdOutlinePendingActions />,
        label: "to-do",
        className: "bg-yellow-100 text-yellow-800",
      },
      "in-progress": {
        icon: <GiProgression />,
        label: "in-progress",
        className: "bg-blue-100 text-blue-800",
      },
      done: {
        icon: <IoCheckmarkDoneCircle />,
        label: "done",
        className: "bg-green-100 text-green-800",
      },
    };

    const { icon, label, className } = config[status] || config["to-do"];

    return (
      <div
        className={`flex gap-3 items-center rounded-full px-3 py-1 ${className}`}>
        {icon} {label}
      </div>
    );
  };

export const PriorityBadge = ({ priority }) => {
    let config = {
      low: {
        icon: <FcLowPriority />,
        label: "low",
        className: "bg-green-100 text-green-800",
      },
      medium: {
        icon: <FcMediumPriority />,
        label: "medium",
        className: "bg-orange-100 text-orange-800",
      },
      high: {
        icon: <FcHighPriority />,
        label: "high",
        className: "bg-red-100 text-red-800",
      },
    };

    const { icon, label, className } = config[priority] || config["low"];

    return (
      <div
        className={`flex gap-3 items-center rounded-full px-3 py-1 ${className}`}>
        {icon} {label}
      </div>
    );
  };


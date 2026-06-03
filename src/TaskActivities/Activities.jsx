import dayjs from "dayjs";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTask } from "../context/TaskContext";
import { LuDot } from "react-icons/lu";
import { TbMinusVertical } from "react-icons/tb";

export const TodayActivities = ({
  type,
  oldValue,
  newValue,
  createdAt,
  message,
  userName,
}) => {
  const { truncateString } = useTask();

  let config = {
    title_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed title:`,
      oldActivity: truncateString(oldValue, 20),
      newActivity: truncateString(newValue, 20),
      icon: <FaArrowRightLong />,
    },
    description_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed description:`,
      oldActivity: truncateString(oldValue, 20),
      newActivity: truncateString(newValue, 20),
      icon: <FaArrowRightLong />,
    },
    status_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed status:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    priority_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed priority:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    assignedTo: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed assignedTo:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    dueDate_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed dueDate:`,
      oldActivity: dayjs(oldValue).format("MMM-DD-YYYY"),
      newActivity: dayjs(newValue).format("MMM-DD-YYYY"),
      icon: <FaArrowRightLong />,
    },
    creation: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} created task:`,
      activityMessage: message,
    },
  };

  const {
    createdDate,
    icon,
    label,
    oldActivity,
    newActivity,
    activityMessage,
  } = config[type];

  return (
    <div className="flex flex-col my-4 md:my-2">
      <div>{createdDate}</div>
      <div className="flex flex-col md:flex-row gap-2 items-center mr-21 md:mr-0">
        <div className="flex items-center">
          <TbMinusVertical className="text-xl" />
          <LuDot className="text-xl" />
          <span className="font-semibold">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{oldActivity}</span>
          <span>{icon}</span>
          <span className="font-semibold">{newActivity}</span>
        </div>
      </div>
      <span>{activityMessage}</span>
    </div>
  );
};

export const YesterdayActivities = ({
  type,
  oldValue,
  newValue,
  createdAt,
  message,
  userName,
}) => {
  const { truncateString } = useTask();

  let config = {
    title_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed title:`,
      oldActivity: truncateString(oldValue, 20),
      newActivity: truncateString(newValue, 20),
      icon: <FaArrowRightLong />,
    },
    description_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed description:`,
      oldActivity: truncateString(oldValue, 20),
      newActivity: truncateString(newValue, 20),
      icon: <FaArrowRightLong />,
    },
    status_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed status:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    priority_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed priority:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    assignedTo: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed assignedTo:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    dueDate_change: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} changed dueDate:`,
      oldActivity: dayjs(oldValue).format("MMM-DD-YYYY"),
      newActivity: dayjs(newValue).format("MMM-DD-YYYY"),
      icon: <FaArrowRightLong />,
    },
    creation: {
      createdDate: dayjs(createdAt).format("h:mm A"),
      label: `${userName} created task:`,
      activityMessage: message,
    },
  };

  const {
    createdDate,
    icon,
    label,
    oldActivity,
    newActivity,
    activityMessage,
  } = config[type];

  return (
    <div className="flex flex-col my-4 md:my-2">
      <div>{createdDate}</div>
      <div className="flex flex-col md:flex-row gap-2 items-center mr-21 md:mr-0">
        <div className="flex items-center">
          <TbMinusVertical className="text-xl" />
          <LuDot className="text-xl" />
          <span className="font-semibold">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{oldActivity}</span>
          <span>{icon}</span>
          <span className="font-semibold">{newActivity}</span>
        </div>
      </div>
      <span>{activityMessage}</span>
    </div>
  );
};

export const OlderActivities = ({
  type,
  oldValue,
  newValue,
  createdAt,
  message,
  userName,
}) => {
  const { truncateString } = useTask();

  let config = {
    title_change: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} changed title:`,
      oldActivity: truncateString(oldValue, 20),
      newActivity: truncateString(newValue, 20),
      icon: <FaArrowRightLong />,
    },
    description_change: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} changed description:`,
      oldActivity: truncateString(oldValue, 20),
      newActivity: truncateString(newValue, 20),
      icon: <FaArrowRightLong />,
    },
    status_change: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} changed status:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    priority_change: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} changed priority:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    assignedTo: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} changed assignedTo:`,
      oldActivity: oldValue,
      newActivity: newValue,
      icon: <FaArrowRightLong />,
    },
    dueDate_change: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} changed dueDate:`,
      oldActivity: dayjs(oldValue).format("MMM-DD-YYYY"),
      newActivity: dayjs(newValue).format("MMM-DD-YYYY"),
      icon: <FaArrowRightLong />,
    },
    creation: {
      createdDate: dayjs(createdAt).format("h:mm A MMM-DD-YYYY"),
      label: `${userName} created task:`,
      activityMessage: message,
    },
  };

  const {
    createdDate,
    icon,
    label,
    oldActivity,
    newActivity,
    activityMessage,
  } = config[type];

  return (
    <div className="flex flex-col my-4 md:my-2">
      <div>{createdDate}</div>
      <div className="flex flex-col md:flex-row gap-2 items-center mr-29 md:mr-0">
        <div className="flex items-center">
          <TbMinusVertical className="text-xl" />
          <LuDot className="text-xl" />
          <span className="font-semibold">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{oldActivity}</span>
          <span>{icon}</span>
          <span className="font-semibold">{newActivity}</span>
        </div>
      </div>
      <span>{activityMessage}</span>
    </div>
  );
};

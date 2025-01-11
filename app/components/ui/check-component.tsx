import Checked from "~/assets/icons/check.svg?react";

const CheckComponent = ({ checked }: { checked: boolean }) => {
  const checkColor = checked ? "#079455" : "white";
  const bgColor = checked ? "bg-green-100" : "bg-gray-300";

  return (
    <span
      className={`rounded-full flex justify-center items-center h-6 w-6  ${bgColor}`} >
      <Checked  style={{color:checkColor }} stroke={checkColor} />
    </span>
  );
};
export default CheckComponent;

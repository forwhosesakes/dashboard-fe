import type { TStepStatus } from "~/types/users.types";
import CheckIcon from "~/assets/icons/check.svg?react";

interface IProps {
  status: TStepStatus;
}

const IdleStep = () => {
  return (
    <div className="w-6 h-6 flex justify-center items-center rounded-full border-2 border-[#E9EAEB] bg-[#FAFAFA]">
      <div className="w-2 h-2 rounded-full border-2 bg-[#D5D7DA]" />
    </div>
  );
};

const DoneStep = () => {
  return (
    <div className="w-6 h-6 p-2 flex justify-center items-center rounded-full  bg-[#00AE84]">
      <CheckIcon color="white" />
    </div>
  );
};

const CurrentStep = () => {
  return (
    <div className="w-6 h-6   flex justify-center items-center rounded-full border-2 border-[#00AE84] bg-white ">
      <div className="w-[18px] h-[18px]  rounded-full border-[6px] bg-white border-[#00AE84]" />
    </div>
  );
};

const StepStatusUI = (props: IProps) => {
  const mapping = {
    IDLE: IdleStep,
    CURRENT: CurrentStep,
    DONE: DoneStep,
  };
  const StatusComp = mapping[props.status];

  return (
    <div className="flex justify-center">
      <StatusComp />
    </div>
  );
};

export default StepStatusUI;

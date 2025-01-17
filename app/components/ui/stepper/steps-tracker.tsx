import type { TSteps } from "~/types/users.types";
import StepStatusUI from "./step-status-ui";

interface IProps {
  steps: TSteps;
  currentStep: any;
}

const StepsTracker = (props: IProps) => {
  return (
    <div className="relative mb-12 h-24">
      <div className="absolute w-5/6 px-2 right-28 top-1/2 h-1 bg-secondary" />

      <div className=" absolute w-11/12 right-14 flex items-center justify-between ">
        {Object.entries(props.steps).map(([Key, value]) => {
          return (
            <div className="mt-10 text-center">
              <StepStatusUI status={value.status} />
              <p className="text-sm  mt-2 text-tertiary-700 font-bold">{value.title}</p>
              <span className="text-xs">{value.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepsTracker;

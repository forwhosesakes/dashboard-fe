import type { TSteps } from "~/types/users.types";
import StepStatusUI from "./step-status-ui";
import { Button } from "../button";

interface IProps {
  steps: TSteps;
  currentStep: any;
  onStepNavigate:(step:number)=>void
}

const StepsTracker = (props: IProps) => {
  return (
    <div className="relative mb-12 h-24">
      <div className="absolute w-[calc(83.333333%-9rem)] -translate-x-2/4 translate-y-0 left-2/4  top-1/2 h-1 bg-secondary" />

      <div className="  absolute w-10/12 -translate-x-2/4 translate-y-0 left-2/4  flex items-center justify-between ">
        {Object.entries(props.steps).map(([Key, value],i) => {
          return (
            <div key={Key} className="mt-10 w-36  text-center">
              <StepStatusUI status={value.status} />
              <Button  onClick={()=>props.onStepNavigate(i)} variant={"link"} className="text-sm  mt-2 text-tertiary-700 font-bold">{value.title}</Button>
              <span className="text-xs">{value.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepsTracker;

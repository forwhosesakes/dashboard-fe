import React, { useState } from "react";
import StepsTracker from "./steps-tracker";
import {  StepsEnum, type TSteps } from  "../../../types/users.types"
import { Button } from "../button";

const stepsIndex = [
  StepsEnum.MAIN_ENTRIES,
  StepsEnum.LOCATION_ENTRIES,
  StepsEnum.REP_ENTRIES,
  StepsEnum.ATTACHMENTS_ENTRIES,
  StepsEnum.SETTINGS_ENTRIES,
];
interface IProps<T> {
  children?: React.ReactNode;
  onComplete: any;
  cancelStepper:any;
  canMoveToNextPage?:any
  onMovingToNextStep:(prevStep:StepsEnum, currentStep:StepsEnum|null)=>void,
  steps: TSteps;
  additionalProps: T;
}
export default function Stepper<T>(props: IProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const CurrentComponent = props.steps[stepsIndex[currentStep]].component;



  const moveToNextPage = ()=>{
    props.onMovingToNextStep(stepsIndex[currentStep],currentStep<stepsIndex.length-1?stepsIndex[currentStep+1]:null)

    setCurrentStep(prev=>prev+1)



  }




  return (
    <div>
      <StepsTracker steps={props.steps} currentStep={props.steps[stepsIndex[currentStep]]} />
      {
        <CurrentComponent
          stepData={props.steps[stepsIndex[currentStep]]}
          additionalProps={props.additionalProps}
        />
      }

      <div className="stepper-action float-end w-1/5 flex gap-x-4">
        <Button variant={"outline"} onClick={props.cancelStepper}  loading={false} >إلغاء</Button>

    {currentStep< stepsIndex.length-1?   <Button variant={"secondary"} onClick={moveToNextPage}  loading={false} >التالي</Button>:<Button onClick={props.onComplete}  loading={false} >حفظ</Button>}
    {currentStep>0&&    <Button variant={"outline"} onClick={()=>setCurrentStep(prev=>prev-1)}  loading={false} >السابق</Button>
}
        

      </div>
    </div>
  );
}

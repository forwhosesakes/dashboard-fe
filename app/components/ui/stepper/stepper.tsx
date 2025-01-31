import React, { useState } from "react";
import StepsTracker from "./steps-tracker";
import { StepsEnum, type TSteps } from "../../../types/users.types";
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
  cancelStepper: any;
  completeDisable: boolean;
  canMoveToNextPage?: any;
  onReachFinalStep?: any;
  onStepChange: (prevStep: StepsEnum, currentStep: StepsEnum | null) => void;
  steps: TSteps;
  additionalProps: T;
}
export default function Stepper<T>(props: IProps<T>) {
  const [currentStep, setCurrentStep] = useState(0);
  const CurrentComponent = props.steps[stepsIndex[currentStep]].component;

  const moveToNextPage = () => {
    if (currentStep === stepsIndex.length - 2) {
      // props.onReachFinalStep()
    }
    props.onStepChange(
      stepsIndex[currentStep],
      currentStep < stepsIndex.length - 1 ? stepsIndex[currentStep + 1] : null
    );

    setCurrentStep((prev) => prev + 1);
  };

  const moveToPrevPage = () => {
    props.onStepChange(
      stepsIndex[currentStep],
      currentStep > 0 ? stepsIndex[currentStep - 1] : null
    );

    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div>
      <StepsTracker
        steps={props.steps}
        currentStep={props.steps[stepsIndex[currentStep]]}
      />
      {
        <CurrentComponent
          // stepData={props.steps[stepsIndex[currentStep]]}
          additionalProps={props.additionalProps}
        />
      }

      <div className="stepper-action float-end w-2/5 flex gap-x-4">
        {currentStep < stepsIndex.length - 1 ? (
          <>
            <Button
              type="button"
              variant={"secondary"}
              onClick={moveToNextPage}
              loading={false}
            >
              التالي
            </Button>
            <Button
              type="submit"
              variant={"secondary"}
              disabled={props.completeDisable}
              onClick={props.onComplete}
              loading={false}
            >
              حفظ
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            variant={"secondary"}
            disabled={props.completeDisable}
            onClick={props.onComplete}
            loading={false}
          >
            حفظ
          </Button>
        )}
        {currentStep > 0 && (
          <Button
            type="button"
            variant={"outline"}
            onClick={moveToPrevPage}
            loading={false}
          >
            السابق
          </Button>
        )}
      </div>
    </div>
  );
}

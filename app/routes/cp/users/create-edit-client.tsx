import { useNavigate, useParams } from "react-router";
import { USER_MGMT } from "./glossary";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { StepsEnum, TFormDataInput } from "~/types/users.types";
import { STEPS } from "./constants/steps";
import Stepper from "~/components/ui/stepper/stepper";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormDataSchema } from "./constants/client-schema";

const CreateEditClient = () => {
  const { userId } = useParams();
  const navigate = useNavigate()
  const formHook = useForm<TFormDataInput>({
    mode:"all",
    resolver:zodResolver(clientFormDataSchema)
  });
  const [formSteps, setFormSteps] = useState(STEPS);


  useEffect(()=>{

console.log("form state ::", formHook.formState);


  },[formHook.formState])

  const onSubmit = (data: TFormDataInput) => {
    console.log(data);
  };
  const isThisFormSectionValid = (formSection: StepsEnum) => {


    //todo: validate all fields for certain section
    return "DONE"

    

  };
  const onMovingToNextStep = (
    prevStep: StepsEnum,
    currentStep: null | StepsEnum,
  ) => {
    const statusForNextStep = isThisFormSectionValid(prevStep);

    setFormSteps((prev) => {
      let newst = {
        ...prev,
        [prevStep]: { ...prev[prevStep], status: statusForNextStep },
      };
      if (currentStep)
        newst[currentStep] = { ...newst[currentStep], status: "CURRENT" };

      return newst;
    });
  };

//todo: properly implement this 
  const onMovingToPrevStep = (
    prevStep: StepsEnum,
    currentStep: null | StepsEnum,
  ) => {
    const statusForNextStep = isThisFormSectionValid(prevStep);

    setFormSteps((prev) => {
      let newst = {
        ...prev,
        [prevStep]: { ...prev[prevStep], status: statusForNextStep },
      };
      if (currentStep)
        newst[currentStep] = { ...newst[currentStep], status: "CURRENT" };

      return newst;
    });
  };

  return (
    <section className="w-full p-12 ">
      <h5>{userId ? USER_MGMT.EDIT_CLIENT : USER_MGMT.CREATE_CLIENT}</h5>
      <form onSubmit={formHook.handleSubmit(onSubmit)}>
        <Stepper<UseFormReturn<TFormDataInput, any, undefined>>
          onComplete={() => {
            console.log("completed");
          }}
          steps={formSteps}
          additionalProps={formHook}
          cancelStepper={()=>navigate("/cp/users")}
          onMovingToNextStep={onMovingToNextStep}
        />
      </form>
    </section>
  );
};

export default CreateEditClient;

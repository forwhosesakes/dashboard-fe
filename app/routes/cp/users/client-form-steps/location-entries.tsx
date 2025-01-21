import type { UseFormReturn } from "react-hook-form";
import type { IStepComponentProps, TFormDataInput } from "~/types/users.types";
import { STEPS } from "../constants/steps";
import TextFormField from "../components/text-form-field";

const LocationEntries = (
  props: IStepComponentProps<UseFormReturn<TFormDataInput, any, undefined>>
) => {
  return (
    <>
      <h6>{STEPS.LOCATION_ENTRIES.title}</h6>
      <p>{STEPS.LOCATION_ENTRIES.description}</p>
      <hr className="my-4" />
      <div>
        {STEPS.LOCATION_ENTRIES.fields.map((field) => (
          <TextFormField
            field={field}
            key={field.label}
            error={
              props.additionalProps.formState.errors[field.label] &&
              props.additionalProps.formState.errors[field.label]?.message
            }
            getFieldState={props.additionalProps.getFieldState}
            register={props.additionalProps.register}
          />
        ))}
      </div>
    </>
  );
};

export default LocationEntries;

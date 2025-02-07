import type {
  UseFormReturn,
} from "react-hook-form";
import type { IStepComponentProps, TFormDataInput } from "~/types/users.types";
import { STEPS } from "../constants/steps";
import TextFormField from "../components/text-form-field";
import DropdownFormField from "../components/dropdown-form-field";
import { USER_MGMT } from "../glossary";

const MainEntries = (
  props: IStepComponentProps<UseFormReturn<TFormDataInput, any, undefined>>
) => {
  return (
    <div className="p-5">
      <h6>{STEPS.MAIN_ENTRIES.title}</h6>
      <p>{STEPS.MAIN_ENTRIES.description}</p>
      <hr className="my-4" />
      <div className="p-5">
        {/* <p>{JSON.stringify(props.additionalProps.formState.touchedFields)}</p> */}
        {STEPS.MAIN_ENTRIES.fields.map((field) => {
          
          return field.type==="DROPDOWN"? (<DropdownFormField
         // @ts-ignore
          valueAccessor={(value)=>USER_MGMT.OPTIONS[value]}
            field={field}
            key={field.label}
            getFieldState={props.additionalProps.getFieldState}
            control={props.additionalProps.control}
            options={field.options??[]}
         
            
          />):(
            <TextFormField
              field={field}
              key={field.label}
              getFieldState={props.additionalProps.getFieldState}
              error={
                props.additionalProps.formState.errors[field.label] &&
                props.additionalProps.formState.errors[field.label]?.message
              }
              register={props.additionalProps.register}
            />
          )
        })}
      </div>
    </div>
  );
};

export default MainEntries;

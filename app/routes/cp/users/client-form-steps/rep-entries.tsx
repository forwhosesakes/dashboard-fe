import type { FieldError, FormState, UseFormReturn } from "react-hook-form"
import type { IStepComponentProps, TFormDataInput } from "~/types/users.types"
import { STEPS } from "../constants/steps"
import TextFormField from "../components/text-form-field"

const RepEntries  = (props:IStepComponentProps<UseFormReturn<TFormDataInput, any, undefined>>)=>{

    return <>
    <h4>{STEPS.REP_ENTRIES.title}</h4>
    <p>{STEPS.REP_ENTRIES.description}</p>
    <hr/>
    <div>
      {STEPS.REP_ENTRIES.fields.map((field)=><TextFormField field={field}
      key={field.label}
      register={props.additionalProps.register} 
    
      getFieldState={props.additionalProps.getFieldState}
      
      />)
      }
    </div>
    
    </>

}

export default RepEntries
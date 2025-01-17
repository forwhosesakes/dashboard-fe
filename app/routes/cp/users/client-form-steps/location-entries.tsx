import type { UseFormReturn } from "react-hook-form"
import type { IStepComponentProps, TFormDataInput } from "~/types/users.types"
import { STEPS } from "../constants/steps"
import TextFormField from "../components/text-form-field"

const LocationEntries = (props:IStepComponentProps<UseFormReturn<TFormDataInput, any, undefined>>)=>{

    return <>
    <h4>{STEPS.LOCATION_ENTRIES.title}</h4>
    <p>{STEPS.LOCATION_ENTRIES.description}</p>
    <hr/>
    <div>
      {STEPS.LOCATION_ENTRIES.fields.map((field)=><TextFormField field={field} 
      key={field.label}

      getFieldState={props.additionalProps.getFieldState}

      register={props.additionalProps.register}/>)
      }
    </div>
    
    </>
}

export default LocationEntries
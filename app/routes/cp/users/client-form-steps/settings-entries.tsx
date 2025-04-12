import type { UseFormReturn } from "react-hook-form"
import type { IStepComponentProps, TFormDataInput } from "~/types/users.types"
import { STEPS } from "../constants/steps"
import SliderFormField from "../components/slider-form-field"

const SettingsEntries = (props:IStepComponentProps<UseFormReturn<TFormDataInput, any, undefined>>)=>{


    return <div className="p-5">
    <h6>{STEPS.SETTINGS_ENTRIES.title}</h6>
    <p>{STEPS.SETTINGS_ENTRIES.description}</p>
    <hr className="my-4"/>
    <div className="p-5">
      {/* <p>{JSON.stringify(props.additionalProps.formState.touchedFields)}</p> */}
      {STEPS.SETTINGS_ENTRIES.fields.map((field)=><SliderFormField field={field} 
      hasSlider={false}
      key={field.label}

      getFieldState={props.additionalProps.getFieldState}
      
      control={props.additionalProps.control}/>)
      }
    </div>
    
    </div>
}
export default SettingsEntries
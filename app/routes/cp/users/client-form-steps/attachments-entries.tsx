import type { UseFormReturn } from "react-hook-form"
import type { IStepComponentProps, TFormDataInput } from "~/types/users.types"
import { STEPS } from "../constants/steps"
import FileFormField from "../components/file-form-field"


const AttachmentsEntries = (props:IStepComponentProps<UseFormReturn<TFormDataInput, any, undefined>>)=>{
    return <div className="p-5">
    <h6>{STEPS.ATTACHMENTS_ENTRIES.title}</h6>
    <p>{STEPS.ATTACHMENTS_ENTRIES.description}</p>
    <hr className="my-4"/>
    <div className="p-5">
      {/* <p>{JSON.stringify(props.additionalProps.formState.touchedFields)}</p> */}
      {STEPS.ATTACHMENTS_ENTRIES.fields.map((field)=><FileFormField field={field}
      key={field.label}


      getFieldState={props.additionalProps.getFieldState}

      control={props.additionalProps.control} error={
        //@ts-ignore
        props.additionalProps.formState.errors[field.label]?.length?props.additionalProps.formState.errors[field.label][0]?.message??"":""}/>)
      }
    </div>
    
    </div>
}

export default AttachmentsEntries
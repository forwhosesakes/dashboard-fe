import type { TField, TFormDataInput } from "~/types/users.types";
import { USER_MGMT } from "../glossary";
import type { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import { useEffect } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  register: UseFormRegister<TFormDataInput>;
  getFieldState: UseFormGetFieldState<TFormDataInput>;
  error:string|undefined,
}

const TextFormField = ({ field,error, getFieldState, register, ...rest }: IProps) => {

//   useEffect(() => {
//     console.log("fieldState:::::", fieldState);
//   }, [fieldState]);

  return (
    <div className="w-4/5 flex  items-start content-start gap-x-8 gap-y-4 self-stretch flex-wrap  my-2 ">
      <label className="max-w-72  min-w-52 flex-[1_0_0]">
        *{USER_MGMT.FORM_FIELDS[field.label]}
      </label>
    {  <InputField
        error={error}
        className="flex-[1_0_0]"
        {...rest}
        placeholder={field.placeholder}
        {...register(field.label)}
      />}
    </div>
  );
};

export default TextFormField;

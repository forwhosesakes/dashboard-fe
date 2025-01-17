import type { TField, TFormDataInput } from "~/types/users.types";
import { USER_MGMT } from "../glossary";
import type { UseFormGetFieldState, UseFormRegister } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import { Switch } from "~/components/ui/switch";
import { Slider } from "~/components/ui/slider";
import { useState } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  register: UseFormRegister<TFormDataInput>;
  getFieldState: UseFormGetFieldState<TFormDataInput>;
}

const SliderFormField = ({
  field,
  getFieldState,
  register,
  ...rest
}: IProps) => {
  const fieldState = getFieldState(field.label);
  const [value, setValue] = useState<number>(30)
  const [switchState, setSwitchState]= useState(true)


  return (
    <>
    <div className=" flex  items-start content-start gap-x-24 gap-y-4 self-stretch flex-nowrap  my-2 ">
      <label className="max-w-72  min-w-52 flex-[1_0_0]">
        *{USER_MGMT.FORM_FIELDS[field.label]}
      </label>
      <div  dir="ltr">
        <Switch checked={switchState}  onCheckedChange={setSwitchState} />
      </div>

      <div className=" flex-[1_0_0]">
        <p className="font-medium text-right mb-2 ">نسبة قياس المؤشر</p>
        <p className="ont-extralight text-right mb-6">حدد قيمة المؤشر لحساب النسبة</p>
        <Slider disabled={!switchState} onValueChange={(v:number[])=>setValue(v[0])} value={[value]} max={100} step={1} />
      </div>

   
    </div>
    <hr className="my-8" />

    </>

);
};

export default SliderFormField;

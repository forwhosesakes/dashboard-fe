import type { TField, TFormDataInput } from "~/types/users.types";
import { USER_MGMT } from "../glossary";
import {
  Controller,
  type Control,
  type UseFormGetFieldState,
} from "react-hook-form";
import { Switch } from "~/components/ui/switch";
import { Slider } from "~/components/ui/slider";
import { useState } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  control: Control<TFormDataInput>;
  hasSlider: boolean;

  getFieldState: UseFormGetFieldState<TFormDataInput>;
}

const SliderFormField = ({
  field,
  getFieldState,
  hasSlider,
  control,
  ...rest
}: IProps) => {
  return (
    <>
      <Controller
        name={field.label}
        control={control}
        render={({ field: { onChange, value }, fieldState }) => {
          const [sliderValue, setSliderValue] = useState<number>(
            (value as number) ?? 0
          );
          const [switchState, setSwitchState] = useState(
            value && (value as number) > 0
          );
          const onValueChange = (n: number) => {
            setSliderValue(n);
            onChange(n);
          };
          const switchToggleChange = (flag: boolean) => {
            setSwitchState(flag);
            onChange(flag ? (hasSlider ? sliderValue : true) : false);
          };
          return (
            <>
              {" "}
              <div className=" flex  items-start content-start gap-x-24 gap-y-4 self-stretch flex-nowrap  my-2 ">
                <div className="flex-[1_0_0]">
                  <label className="w-72 border  min-w-52 ">
                    *{USER_MGMT.FORM_FIELDS[field.label]}
                  </label>
                  {fieldState.error && (
                    <p className="text-red-800 my-1 text-xs">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>

                <div className={"flex-[1_0_0"} dir="ltr">
                  <Switch
                    checked={!!switchState}
                    onCheckedChange={switchToggleChange}
                  />
                </div>

                <div className=" flex-[1_0_0]">
                  {hasSlider && (
                    <>
                      {" "}
                      <p className="font-medium text-right mb-2 ">
                        نسبة قياس المؤشر
                      </p>
                      <p className="ont-extralight text-right mb-6">
                        حدد قيمة المؤشر لحساب النسبة
                      </p>
                      <Slider
                        disabled={!switchState}
                        onValueChange={(v: number[]) => onValueChange(v[0])}
                        value={[sliderValue]}
                        max={100}
                        step={1}
                      />
                    </>
                  )}
                </div>
              </div>
              <hr className="my-8" />
            </>
          );
        }}
      />
    </>
  );
};

export default SliderFormField;

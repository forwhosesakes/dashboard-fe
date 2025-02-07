import {
  Controller,
  type Control,
  type UseFormGetFieldState,
} from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import type { TField, TFormDataInput } from "~/types/users.types";
import { USER_MGMT } from "../glossary";
import React from "react";
import { ChevronDownIcon } from "lucide-react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  options: string[];
  control: Control<TFormDataInput>;
  valueAccessor: (value:string)=>string;
  getFieldState: UseFormGetFieldState<TFormDataInput>;
}

const DropdownFormField = (props: IProps) => {
  return (
     <div className="w-4/5 flex  items-start content-start gap-x-8 gap-y-4 self-stretch flex-wrap  my-2 ">
          <label className="max-w-72  min-w-52 flex-[1_0_0]">
            *{USER_MGMT.FORM_FIELDS[props.field.label]}
          </label>
      <Controller
        name={props.field.label}
        control={props.control}
        render={({ field: { onChange, value } }) => {            
          return (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-1/4 p-2 shadow-custom text-right border  flex rounded-lg">
                 {/* @ts-ignore */}
                {props.valueAccessor(value)??"لا يوجد"}

                

                <ChevronDownIcon  className="mr-auto transition-all transform " />
                </DropdownMenuTrigger>
              <DropdownMenuContent>
              <DropdownMenuRadioGroup value={value as string} onValueChange={onChange}>
              {props.options.map((option) => (
                    //@ts-ignore
                  <DropdownMenuRadioItem value={option} className="w-44" key={option}>{props.valueAccessor(option)}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
               
              </DropdownMenuContent>
            </DropdownMenu>
          );

     
        }}
      />
    </div>
  );
};

export default DropdownFormField;

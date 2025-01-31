import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import {
  Controller,
  type Control,
  type UseFormGetFieldState,
} from "react-hook-form";
import { DropdownMenu, DropdownMenuTrigger } from "~/components/ui/dropdown";
import type { TField, TFormDataInput } from "~/types/users.types";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: TField;
  control: Control<TFormDataInput>;
  error:string|undefined,
  getFieldState: UseFormGetFieldState<TFormDataInput>;
}
const DropdownFormField = (props: IProps) => {
  return (
    <>
      <Controller
        name={props.field.label}
        control={props.control}
        render={({ field: { onChange, value }, fieldState }) => {
          return (
            <>
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <div className="h-full w-full p-2 border rounded-lg relative cursor-pointer">
                    <div className="absolute flex justify-center h-6 w-6 rounded border left-2 top-2 hover:bg-secondary/10 transition-colors duration-300">
                      <div className="relative flex flex-col">
                        <ChevronUp className="h-3 w-3" />
                        <ChevronDown className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </>
          );
        }}
      />
    </>
  );
};

export default DropdownFormField;

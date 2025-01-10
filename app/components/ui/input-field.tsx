import React from "react"
import { cn } from "~/lib/tw-merge"


interface IProps {
  label?:string, 
  placeholder?:string
}

export const Input= React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
        
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      )
    }
  )


  export const InputField= (props:IProps)=>{

    return <div>

      {props.label && <label className="text-secondary-700"> {props.label}</label>}
      <Input {...props}/>
    </div>

  }

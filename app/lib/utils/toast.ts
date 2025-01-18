import { toast } from 'sonner'
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { createElement } from "react"

type ToastOptions = {
    message:string;
    description?:string
}


export const toasts = {
    success: ({message, description}:ToastOptions)=>{
        toast.success(message,{
            description,
            icon: createElement(CheckCircle,{
                style:{
                    marginRight:10
                }
            }),
            // style:{
            //     backgroundColor:"red"
            // },
        })
    },
    error:({message, description}:ToastOptions)=>{
        toast.error(message,{
            description,
            icon:createElement(AlertCircle,{
                className:"w-4 h-4 text-red-500"
            }),
            className:"bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
        })
    },
    info:({message, description}:ToastOptions)=>{
        toast.info(message,{
            description,
            icon:createElement(Info,{
                className:"w-4 h-4 text-blue-500"
            }),
            className:"bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
        })
    },
    warning:({message, description}:ToastOptions)=>{
        toast.warning(message,{
            description,
            icon:createElement(AlertTriangle,{
                className:"w-4 h-4 text-yellow-500"
            }),
            className:"bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
        })
    }
}
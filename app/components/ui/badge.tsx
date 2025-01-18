const Badge = ({children,color }:{children?:React.ReactNode, color:"blue"|"mauv"|"red"|"green"},)=>{

    const bgColor = ()=>{
        switch (color){
            case "blue":
                return "bg-[#2E90FA]"
                case "green":
                    return "bg-[#00AE84]"
                     case "red":
                    return "bg-[#EE46BC]"
                             case "mauv":
                    return "bg-[#7A5AF8]"
        }
    }

    return <div className="flex text-xs shadow-custom items-center border border-[#D5D7DA] rounded-md px-2 py-[6px] gap-x-1">
        {children}

        <div className={` ${bgColor()}   rounded-full h-2 w-2`}/>
    </div>
}
export default Badge
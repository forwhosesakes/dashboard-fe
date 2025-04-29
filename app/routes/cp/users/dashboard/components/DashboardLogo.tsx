import { useCallback, useEffect, useRef, useState } from "react"

interface IProps {
    logoUrl:string
}

type ImageSize ={
width:number, 
height:number

}


const DashboardLogo = ({logoUrl}:IProps)=>{

    const [size,setSize] = useState<ImageSize>({width:132, height: 58})
   
 

    const measuredImageRef = useCallback((node:any) => {
        if (node !== null) {
       const ratio = Math.floor(node?.width/node?.height)
       
       if (ratio && ratio <=1){        
        setSize({width:58, height: 60})
       }
        }
      }, []);


    return <div className="mt-6 "
    
    style={{width:size.width, height:size.height}}>
        <img className="object-fit  w-full h-full " src = {logoUrl} ref={measuredImageRef}/>
    </div>
    
}


export default DashboardLogo
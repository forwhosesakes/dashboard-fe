import { useEffect } from "react";
import { useLoaderData, type LoaderFunctionArgs } from "react-router"


export const loader = ({context, params}:LoaderFunctionArgs) => {
    const {id,dashboardType}=params

    console.log("from loader:: ",id,dashboardType);

    
    return { 
        id,
        dashboardType
    }
}



 const Dashbaord=()=>{
    const { id, dashboardType } = useLoaderData();

 

    return(
    <>

    </>
    )
}

export default Dashbaord
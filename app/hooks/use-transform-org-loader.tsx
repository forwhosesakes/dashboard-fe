import { useLoaderData } from "react-router";
import { FILE_FIELDS } from "~/routes/cp/users/constants/client-shared";
import type { LoaderData } from "~/types/users.types";


const useTranformOrgLoaderdata = ()=>{


    const loaderData = useLoaderData() as unknown as LoaderData;

    if(loaderData.status!=="success") return loaderData

    FILE_FIELDS.forEach((field)=>{
        console.log("load data useTranformOrgLoaderdata", loaderData.data[field]);
        

        try {
        //@ts-ignore
        // const base64Arr:any[] = Promise.all(loaderData.data[field].map( async (data)=>await fetch(data)))
        // const blobArr = Promise.all(base64Arr.map(async (base64)=>await base64.blob()))
        //  //@ts-ignore
        // loaderData.data[field] = [blobArr]
        }

        catch(e){
            console.log("error happened while converting to base64", e)
        }


    })


    console.log("loaderata from  useTranformOrgLoaderdata", loaderData)
    return loaderData




}

export default useTranformOrgLoaderdata
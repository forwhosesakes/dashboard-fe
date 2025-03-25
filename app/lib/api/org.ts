export const orgApi = (url:string) => {
    return {
        getLatestOrgs:async()=>{
            const response = await fetch(`${url}/org/latest`)
            const result = await response.json() as any

            return result.data 
                        

        },
        getOrgByUserId:async(userId:string)=>{
            const response = await fetch(`${url}/org/getOrgByUserId/${userId}`)
            const result = await response.json() as any

            return result.data
        },
        getOrgCount:async()=>{
            try {
                const response = await fetch(`${url}/org/count`)
                const result = await response.json() as any
                return result.data
            }
            catch(e){
                console.log("error in getOrgCount",e);
                return null
                

            }
         
        },

        getMembersCount:async()=>{
            try {
                const response = await fetch(`${url}/users/count`)
                const result = await response.json() as any
                return result.data
            }
            catch(e){
                console.log("error in getMembersCount",e);
                return null
                

            }
         
        },

        
    }

}
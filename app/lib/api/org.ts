export const orgApi = (url:string) => {
    return {
        getLatestOrgs:async()=>{
            const response = await fetch(`${url}/org/latest`)
            const result = await response.json()

            return result.data 
                        

        },
        getOrgByUderId:async(userId:string)=>{
            const response = await fetch(`${url}/org/getOrgByUserId/${userId}`)
            const result = await response.json()

            return result.data
        }
    }

}
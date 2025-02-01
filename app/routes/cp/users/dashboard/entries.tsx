import { NavLink, useLoaderData, useLocation, type LoaderFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import { useEffect, useRef, useState } from "react";
import { dashboardApi, type DashboardType, type OperationalDashboardEntriesType } from "~/lib/api/dashboard"
import Entry from "./components/entry"
import {financialEntriesLabels} from "./constants/glossary"



export const loader = async({context,params}:LoaderFunctionArgs)=>{
    console.log("params:: ", params);
    
    let {id,dashboardType} = params
    if (dashboardType === "CORPORATE"){
        // console.log("yesss corporateeee");
        
        dashboardType = "CORPRATE"

    } 
    // console.log(dashboardType);
    
    const entries = await dashboardApi(context.cloudflare.env.BASE_URL).getEntries(`${id}`,dashboardType as DashboardType?? "GENERAL")
    console.log("entries :: ",entries);
    
return {entries:entries[0],currentDashboard:dashboardType,baseUrl:context.cloudflare.env.BASE_URL,id}
}


const Entries = ({
  currentIndicator,
}: {
  currentIndicator: { name: string };
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);  // Add this line

    const locationData = useLocation();
    useEffect(()=>{
      console.log("overview:: ",locationData.state);
      const dashboardsOverview = locationData.state?.dashboardsOverview
      if(dashboardsOverview){
          const dashboardStatus = dashboardsOverview.find(dashboard=>dashboard.title.includes(currentDashboard)).status
          const excludedKeys = ['id', 'dashbaordId', 'createdAt', 'updatedAt'];
          console.log(entries);
          
          const newEntries = Object.entries(entries)
              .filter(([key]) => !excludedKeys.includes(key))
              .map(([key,value])=>({
                  name:key,
                  label:financialEntriesLabels[key],
                  value
              }))
          setCurrentEntries(newEntries)
      }
  },[])
    const {entries,currentDashboard,baseUrl,id} = useLoaderData<OperationalDashboardEntriesType | []>();
  const [entryToEdit, setEntryToEdit] = useState<{
    name: string;
    value: number;
  } | null>(null);
  const [currentEntries,setCurrentEntries] = useState<{name:string,value:any,label:string}[]>([
    { name: "name",label:"مدخل" , value: 45 },

  ]);
  
 


  const editEntry = () => {
    if(entryToEdit){
        const index = currentEntries.findIndex((entry)=>entryToEdit.name===entry.name)
        currentEntries[index].value = entryToEdit.value
    }
  };

  const saveEntries=async()=>{
    try{


      const requestBody = {}
      currentEntries.forEach((entry)=>{
       requestBody[entry.name]=entry.value
     })
     const result = await dashboardApi(baseUrl).saveEntries({
      id,
      type:currentDashboard,
      entries:requestBody
    })
     console.log("Indicators: ", result.indicators);
 
    }catch(e){
      console.error("Failed to save entries:",e)
    }
 
  }
  return (
    <>
      <div className="flex justify-between p-5">
        <div>
          <h5>{`${currentIndicator?.name ?? "مؤشر الأداء المالي"}`}</h5>
          <p className="text-primary-foreground/75">{`أدخل بيانات المؤشر.`}</p>
        </div>
        <div className="flex gap-x-4">
            <Button variant={"secondary"} onClick={saveEntries}>{"حفظ المدخلات"}</Button>
          <NavLink to={`dashboard`}>
            <Button variant={"outline"}>{"تعديل"}</Button>
          </NavLink>
        </div>
      </div>

      <div id="tabs" className="w-full h-full border-t pt-2">
        <Tabs defaultValue="financial" dir="rtl" className="w-full">
          <TabsList className="w-full justify-start bg-transparent">
            <TabsTrigger value="general">اللوحة العامة</TabsTrigger>
            <TabsTrigger value="financial">مؤشر الأداء المالي</TabsTrigger>
            <TabsTrigger value="operational">مؤشر الأداء التشغيلي</TabsTrigger>
            <TabsTrigger value="governance">مؤشر الحوكمة</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="p-4">
              {/* Content for اللوحة العامة */}
              محتوى اللوحة العامة
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <div className="p-4">
              {/* Content for مؤشر الأداء المالي */}
              <div className="flex flex-col justify-center items-center">
                <SemiCircleProgress percentage={86} />
                <p className="font-semibold text-primary-foreground/50">
                  نسبة إكمال البيانات
                </p>
              </div>

              <div className="flex flex-col border">
                <p className="text-accent font-semibold p-1">
                  بيانات المؤشر المالي
                </p>
                <div
                  id="finance-entries"
                  className="flex flex-wrap w-full border-t"
                >
                  
                  {currentEntries.map((entry, index) => (
            <div className="border w-1/5 flex flex-col" key={entry.name}>
                <p className="border-b p-2 text-accent font-semibold">
                    {entry.label}
                </p>
                {entryToEdit?.name === entry.name ? (
                    <input
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        className="bg-white text-primary-foreground p-2"
                        onBlur={() => {
                            editEntry()
                            setEntryToEdit(null);
                        }}
                        onInput={(e)=>setEntryToEdit({name:entryToEdit?.name,value:e.target.value})}
                        value={entryToEdit.value}
                    />
                ) : (
                    <button
                        className="flex p-2 w-full"
                        onClick={() => setEntryToEdit(entry)}
                    >
                        <p className="">{entry.value}</p>
                    </button>
                )}
            </div>
        ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="operational">
            <div className="p-4">
              {/* Content for مؤشر الأداء التشغيلي */}
              محتوى مؤشر الأداء التشغيلي
            </div>
          </TabsContent>

          <TabsContent value="governance">
            <div className="p-4">
              {/* Content for مؤشر الحوكمة */}
              محتوى مؤشر الحوكمة
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Entries;

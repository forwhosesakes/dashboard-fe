import { Maximize2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import { useThemeStore } from "~/lib/store/theme-store";

interface ViewToggleProps {
  view: "entries" | "indicators";
  hasIndicators:boolean
  onViewChange: (view: "entries" | "indicators") => void;
  toggleFullscreen:()=>void
}

const ViewToggle = ({ view, onViewChange ,hasIndicators,toggleFullscreen}: ViewToggleProps) => {
  
    const {setDarkTheme,setLightTheme} = useThemeStore()
  

 
  return (
  <div className="flex justify-between p-5 gap-2 mb-4">
    <ButtonGroup >
      <Button 
      className={`${view === 'entries' ? 'bg-primary-100' : ''}`}
           variant={ 'outline'}
      onClick={() => {onViewChange("entries")
        setLightTheme()


      }}>
        المدخلات
      </Button>
      <Button  
      disabled={!hasIndicators}
       className={`${view === 'indicators' ? 'bg-primary-100' : ''}`}
      variant={ 'outline'} onClick={() => {
        setDarkTheme()
        onViewChange("indicators")}}>
        المؤشرات
      </Button>
    </ButtonGroup>

    <Button disabled={view === "indicators" ? false : true} onClick={toggleFullscreen} className={`border-white w-9 p-2 ${view === "entries" ? "hidden" : ""}`}>
          <Maximize2 className=""/>
          </Button>
  </div>
)};

export default ViewToggle;

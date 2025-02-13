import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";
import { useThemeStore } from "~/lib/store/theme-store";

interface ViewToggleProps {
  view: "entries" | "indicators";
  hasIndicators:boolean
  onViewChange: (view: "entries" | "indicators") => void;
}

const ViewToggle = ({ view, onViewChange ,hasIndicators}: ViewToggleProps) => {
  
    const {setDarkTheme,setLightTheme} = useThemeStore()
  
  return (
  <div className="flex gap-2 mb-4">
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
  </div>
)};

export default ViewToggle;

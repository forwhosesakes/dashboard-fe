import { Button } from "~/components/ui/button";
import { ButtonGroup } from "~/components/ui/button-group";

interface ViewToggleProps {
  view: "entries" | "indicators";
  onViewChange: (view: "entries" | "indicators") => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => (
  <div className="flex gap-2 mb-4">
    <ButtonGroup >
      <Button 
      className={`${view === 'entries' ? 'bg-primary-100' : ''}`}
           variant={ 'outline'}
      onClick={() => onViewChange("entries")}>
        المدخلات
      </Button>
      <Button  
       className={`${view === 'indicators' ? 'bg-primary-100' : ''}`}
      variant={ 'outline'} onClick={() => onViewChange("indicators")}>
        المؤشرات
      </Button>
    </ButtonGroup>
  </div>
);

export default ViewToggle;

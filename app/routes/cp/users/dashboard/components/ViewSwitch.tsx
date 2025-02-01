import { Button } from "~/components/ui/button";

interface ViewToggleProps {
    view: 'entries' | 'indicators';
    onViewChange: (view: 'entries' | 'indicators') => void;
}

const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => (
    <div className="flex gap-2 mb-4">
        <Button 
            variant={view === 'entries' ? 'default' : 'outline'}
            onClick={() => onViewChange('entries')}
        >
            المدخلات
        </Button>
        <Button 
            variant={view === 'indicators' ? 'default' : 'outline'}
            onClick={() => onViewChange('indicators')}
        >
            المؤشرات
        </Button>
    </div>
);

export default ViewToggle
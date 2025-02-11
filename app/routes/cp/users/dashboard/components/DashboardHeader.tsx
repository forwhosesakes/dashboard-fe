import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import CircularSpinner from "~/components/ui/circular-spinner";
import type { DashboardType } from "~/lib/api/dashboard";

interface DashboardHeaderProps {
    dashboardType: DashboardType;
    onSave: () => void;
    loading:boolean
}

const DashboardHeader = ({ dashboardType, onSave ,loading}: DashboardHeaderProps) => (
    <div className="flex justify-between p-5">
        <div>
            <h5>{
          dashboardType === 'FINANCIAL' ? 'الأداء المالي' :
          dashboardType === 'OPERATIONAL' ? 'الأداء التشغيلي' :
          dashboardType === 'CORPORATE' ? 'الأداء المؤسسي' : 'العام'
        }</h5>
            <p className="text-primary-foreground/75">أدخل بيانات المؤشر.</p>
        </div>
        <div className="flex gap-x-4">
            <Button variant="secondary" onClick={onSave}>حفظ المدخلات

            {loading && <CircularSpinner  size="xs"/>}
            </Button>
            <NavLink to="dashboard">
                {/* //todo: should be in a dialog */}
                <Button variant="outline">اصدار نسخة جديدة</Button>
            </NavLink>
        </div>
    </div>
);

export default DashboardHeader
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import type { DashboardType } from "~/lib/api/dashboard";

interface DashboardHeaderProps {
    dashboardType: DashboardType;
    onSave: () => void;
}

const DashboardHeader = ({ dashboardType, onSave }: DashboardHeaderProps) => (
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
            <Button variant="secondary" onClick={onSave}>حفظ المدخلات</Button>
            <NavLink to="dashboard">
                <Button variant="outline">تعديل</Button>
            </NavLink>
        </div>
    </div>
);

export default DashboardHeader
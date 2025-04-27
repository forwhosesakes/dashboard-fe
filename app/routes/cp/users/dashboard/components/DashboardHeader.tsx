import { useState } from "react";
import { Button } from "~/components/ui/button";
import CircularSpinner from "~/components/ui/circular-spinner";
import type { DashboardType } from "~/lib/api/dashboard";
import EntriesSaveConfirmationDialoug from "./EntriesSaveConfirmationDialoug";
import ResetEntriesConfirmationDialoug from "./ResetEntriesConfirmationDialoug";

interface DashboardHeaderProps {
  dashboardType: DashboardType |"GOVERNANCE";
  onSave: () => void;
  onDelete: () => void;
  loading: boolean;
  orgName:string
}

const DashboardHeader = ({
  dashboardType,
  onSave,
  onDelete,
  loading,
  orgName
}: DashboardHeaderProps) => {
  const [toSave, setToSave] = useState(false);
  const [toDelete, setToDelete] = useState(false);

  return (
    <div className="flex justify-between p-5">
      {toSave && (
        <EntriesSaveConfirmationDialoug
          isOpen={toSave}
          onClose={() => setToSave(false)}
          onConfirm={onSave}
          type={dashboardType}
        />
      )}
      {toDelete && (
        <ResetEntriesConfirmationDialoug
          isOpen={toDelete}
          onClose={() => setToDelete(false)}
          onConfirm={onDelete}
          type={dashboardType}
        />
      )}

      <div>
        <h5>
          {dashboardType === "FINANCIAL"
            ? "الأداء المالي"
            : dashboardType === "OPERATIONAL"
            ? "الأداء التشغيلي"
            : dashboardType === "CORPORATE"
            ? "الأداء المؤسسي"
            : dashboardType==="GOVERNANCE"?"لوحة الحوكمة"
            : "العام"}
            {orgName && ` لجمعية  ${orgName}`}
        </h5>
        <p className="text-primary-foreground/75">أدخل بيانات المؤشر.</p>
      </div>
      <div className="flex gap-x-4">
        <Button variant="secondary" onClick={() => setToSave(true)}>
          حفظ المدخلات
          {loading && <CircularSpinner size="xs" />}
        </Button>
        {dashboardType.toUpperCase()!=="GENERAL"&&<Button
          onClick={() => setToDelete(true)}
          variant="outline"
          className="text-destructive  text-nowrap hover:bg-destructive hover:text-destructive-foreground border border-destructive"
        >
          {" "}
          إعادة التعيين
        </Button>}
      </div>
    </div>
  );
};

export default DashboardHeader;

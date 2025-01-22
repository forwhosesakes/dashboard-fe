import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "~/components/ui/alert-dialog";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "~/components/ui/select";
  import type { MemberType } from "../members";
  import { useState } from "react";
  
  type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (subRole: MemberType["subRole"]) => Promise<void>;
    member: MemberType;
  };
  
  const EditMemberDialog = ({ isOpen, onClose, onConfirm, member }: Props) => {
    const [subRole, setSubRole] = useState<MemberType["subRole"]>(member.subRole);
    const [isUpdating, setIsUpdating] = useState(false);
  
    const handleConfirm = async () => {
      setIsUpdating(true);
      try {
        await onConfirm(subRole);
      } finally {
        setIsUpdating(false);
        onClose();
      }
    };
  
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تعديل دور العضو</AlertDialogTitle>
            <AlertDialogDescription>
              تعديل دور العضو {member.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <div className="py-4">
            <Select value={subRole} onValueChange={setSubRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dataEntry">مدخل بيانات</SelectItem>
                <SelectItem value="admin">مسؤول نظام</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <AlertDialogFooter dir="rtl" className="gap-x-4">
            <button
              onClick={handleConfirm}
              disabled={isUpdating}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {isUpdating ? "جاري الحفظ..." : "حفظ"}
            </button>
            <AlertDialogCancel onClick={onClose}>
              إلغاء
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default EditMemberDialog;
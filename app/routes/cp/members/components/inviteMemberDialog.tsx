import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "~/components/ui/select";
import type { MemberType } from "../members";
import { useState } from "react";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSendInvite: (data: { email: string; role: MemberType["role"] }) => void;
};

const InviteMemberDialog = ({ isOpen, onClose, onSendInvite }: TProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberType["role"]>("user");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSendInvite({ email, role });
    // Reset form
    setEmail("");
    setRole("user");
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            دعوة عضو جديد
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            أدخل البريد الإلكتروني ودور العضو الجديد
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-right block">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-black p-2 border rounded-md text-right"
              placeholder="example@domain.com"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-right block">
              الدور
            </label>
            <Select
              value={role}
              onValueChange={(value: MemberType["role"]) => setRole(value)}
            >
              <SelectTrigger className="w-full text-right">
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">مسؤول</SelectItem>
                <SelectItem value="user">مستخدم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter dir="rtl" className="gap-x-4 mr-auto">
            <AlertDialogCancel onClick={onClose}>
              إلغاء
            </AlertDialogCancel>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              إرسال الدعوة
            </button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteMemberDialog;
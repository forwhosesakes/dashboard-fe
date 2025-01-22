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
import { X, Mail, Plus, Trash2 } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { toast } from "sonner";

type UsersRequestType = {
  email: string;
  password: string;
  name: string;
  subRole: "admin" | "dataEntry" | "org";
  role: "admin" | "user";
};

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  serverUrl: string;
  onSendInvite: (data: {
    email: string;
    subRole: MemberType["subRole"];
  }) => void;
};

type InviteField = {
  id: string;
  email: string;
  name: string;
  subRole: MemberType["subRole"];
  password: string;
};

const InviteMemberDialog = ({
  isOpen,
  onClose,
  closeDialog,
  serverUrl,
  isAdmin
}: TProps) => {
  const [inviteFields, setInviteFields] = useState<InviteField[]>([
    {
      id: "1",
      email: "",
      name: "",
      subRole: "dataEntry",
      password: "",
    },
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      for (const member of inviteFields) {
        if (!member.email || !member.name) continue;

        member.password = crypto.randomUUID();

        // console.log("user created:",{
        //     email: member.email,
        //   name: member.name,
        //   password: member.password,
        //   role: "admin",
        //   data: {
        //     subRole: member.subRole,
        //   },
        // });
        
        await authClient(serverUrl).admin.createUser({
          email: member.email,
          name: member.name,
          password: member.password,
          role: "admin",
          data: {
            subRole: member.subRole,
          },
        });


        console.log("cookie is :: ",document.cookie);
        
        const response = await fetch(`${serverUrl}/users/send-welcome-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Cookie: document.cookie || "",
            },
            body: JSON.stringify({
              email: member.email,
              name: member.name,
              password: member.password,
              isAdmin
            }),
          });

          if(!response.ok){
            throw new Error("Failed to send welcome email")
          }

    toast.success("تم إضافة الأعضاء وإرسال رسائل الترحيب بنجاح");

    closeDialog(false)
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء إضافة الأعضاء");
    }

  };


//   const handleSubmit =  async(e: any) => {
//     e.preventDefault();

    
//    await inviteFields.forEach(async(member) => {
//       member.password = crypto.randomUUID();
//       if (!member.email || !member.name) {
//         return;
//       }

//       await authClient(serverUrl).admin.createUser({
//         email: member.email,
//         name: member.name,
//         password: member.password,
//         role: "admin",
//         data: {
//           subRole: member.subRole,
//         },
//       });

//     });
//     closeDialog(false)
//   };

   

  const removeInviteField = (id: string) => {
    if (inviteFields.length > 1) {
      setInviteFields(inviteFields.filter((field) => field.id !== id));
    }
  };

  const addInviteField = () => {
    setInviteFields([
      ...inviteFields,
      {
        id: crypto.randomUUID(),
        email: "",
        name: "",
        subRole: "dataEntry",
        password: "",
      },
    ]);
  };

  const updateField = (id: string, field: keyof InviteField, value: string) => {
    setInviteFields(
      inviteFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex text-primary-foreground items-center gap-2">
            دعوة عضو جديد
          </AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            أدخل البريد الإلكتروني ودور العضو الجديد
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4  flex flex-col  mt-4"
        >
          {inviteFields.map((member) => (
            <div key={member.id} id="invitation fields" className=" flex gap-5">
              <input
                id="email"
                type="email"
                required
                value={member.email}
                onChange={(e) =>
                  updateField(member.id, "email", e.target.value)
                }
                className="w-full bg-white text-black p-2 border rounded-md text-right"
                placeholder="example@domain.com"
                dir="ltr"
              />
              <input
                id="name"
                type="text"
                required
                value={member.name}
                onChange={(e) => updateField(member.id, "name", e.target.value)}
                className="w-full bg-white text-black p-2 border rounded-md text-right"
                placeholder="أدخل إسم العضو"
                dir="ltr"
              />

              <Select
                value={member.subRole}
                onValueChange={(value: MemberType["subRole"]) =>
                  updateField(member.id, "subRole", value)
                }
              >
                <SelectTrigger className="w-full h-full max-w-36 text-right">
                  <SelectValue placeholder="اختر الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dataEntry">مدخل بيانات</SelectItem>
                  <SelectItem value="admin">مسؤول نظام</SelectItem>
                </SelectContent>
              </Select>

              {inviteFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInviteField(member.id)}
                  className="p-1 rounded-full hover:bg-red-600 text-red-600 hover:text-primary"
                >
                  <Trash2 className="w-4 h-4  " />
                </button>
              )}
            </div>
          ))}

          <div id="add another" className="flex my-1 justify-end px-5">
            <button onClick={addInviteField} className="flex gap-2">
              <Plus />
              إضافة أخرى
            </button>
          </div>

          <AlertDialogFooter dir="rtl" className="gap-x-4 w-full mr-auto">
            <div className="flex w-full justify-between px-12">
              <button
                type="submit"
                className="inline-flex gap-2  border items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-primary hover:bg-accent/90 h-10 px-4 py-2"
              >
                <Mail />
                إرسال الدعوات
              </button>
              <AlertDialogCancel
                className="w-2/12 px-4 py-2 hover:bg-red-600 hover:text-primary"
                onClick={onClose}
              >
                إلغاء
                <X />
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteMemberDialog;

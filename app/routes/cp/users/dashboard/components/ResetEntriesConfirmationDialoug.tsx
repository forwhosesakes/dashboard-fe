import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import type { DashboardType } from "~/lib/api/dashboard";
import RemoveIcon from "~/assets/icons/remove.svg?react"
import CirclesSvg from "~/assets/images/circles.svg?react"

type TProps = {
  isOpen: boolean,
  onClose: any,
  onConfirm: any,
  type:DashboardType |"GOVERNANCE";
}


const ResetEntriesConfirmationDialoug = ({   isOpen, 
    onClose, 
    onConfirm,
    type
   }:TProps)=>{

    const handleConfirm = (e: any) => {
        e.preventDefault();
        onConfirm();
      };
      return (
        <AlertDialog  open={isOpen} onOpenChange={onClose}>
          <AlertDialogContent className="  overflow-hidden max-w-md">

            <div className="  " >
            <RemoveIcon className="absolute top-5 left-5 w-12 h-12 rounded-full bg-red-100 p-3 *:stroke-red-700"/>

{/* <CirclesSvg  className="absolute -top-5 left-0 h-44 z-0 "/> */}
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex text-tertiary-900 items-center gap-2">
             إعادة تعيين المؤشرات            </AlertDialogTitle>
              <AlertDialogDescription className="text-right">
               هل أنت متأكد أنك تريد حذف مدخلات هذه اللوحة وإعادة تعين مؤشرات اللوحة كذلك؟ لا يمكن التراجع عن هذا الإجراء.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter dir="rtl" className="gap-x-4 mr-auto">
              <AlertDialogCancel>الالغاء</AlertDialogCancel>
              <button
                onClick={(e) => {
                  handleConfirm(e);
                  onClose(e);
                }}
                className="inline-flex  text-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-700 text-destructive-foreground hover:bg-red-700/90 h-10 px-4 py-2"
              >
                إعادة تعيين
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    


}


export default ResetEntriesConfirmationDialoug
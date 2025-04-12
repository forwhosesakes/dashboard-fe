import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import type { DashboardType } from "~/lib/api/dashboard";
import CheckIcon from "~/assets/icons/check-circle.svg?react"
import CirclesSvg from "~/assets/images/circles.svg?react"

type TProps = {
  isOpen: boolean,
  onClose: any,
  onConfirm: any,
  type:DashboardType |"GOVERNANCE";
}


const EntriesSaveConfirmationDialoug = ({   isOpen, 
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
            <CheckIcon className="absolute top-5 left-5 w-12 h-12 rounded-full bg-green-100 p-3"/>

{/* <CirclesSvg  className="absolute -top-5 left-0 h-44 z-0 "/> */}
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex text-tertiary-900 items-center gap-2">
               اعتماد بيانات المؤشر
              </AlertDialogTitle>
              <AlertDialogDescription className="text-right">
        هل أنت متأكد من  تم نشر هذه المدخلات؟ سيتمكن أعضاء الفريق من تعديل هذه اللوحة وإعادة نشر التغييرات
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter dir="rtl" className="gap-x-4 mr-auto">
              <AlertDialogCancel>الالغاء</AlertDialogCancel>
              <button
                onClick={(e) => {
                  handleConfirm(e);
                  onClose(e);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-primary hover:bg-green-600/90 h-10 px-4 py-2"
              >
                التأكيد
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    


}


export default EntriesSaveConfirmationDialoug
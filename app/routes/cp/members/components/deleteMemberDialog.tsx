import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '~/components/ui/alert-dialog';
  import type { MemberType } from '../members';
  
  type PropsType = {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    member: MemberType
  }
  
  const DeleteMemberDialog = ({ 
      isOpen, 
      onClose, 
      onConfirm,
      member 
    }: PropsType) => {
      // Create a handleConfirm function to ensure the event is passed
      const handleConfirm = (e: any) => {
        e.preventDefault();
        onConfirm();
      };
    
      return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                حذف العضو
              </AlertDialogTitle>
              <AlertDialogDescription className="text-right">
                هل أنت متأكد من حذف العضو {member.name}؟
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter dir="rtl" className="gap-x-4 mr-auto">
              <AlertDialogCancel>الالغاء</AlertDialogCancel>
              <button
                onClick={(e) => {
                  handleConfirm(e);
                  onClose();
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-700 text-destructive-foreground hover:bg-red-700/90 h-10 px-4 py-2"
              >
                حذف
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    };
  
  export default DeleteMemberDialog;
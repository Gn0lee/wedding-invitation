import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export function SuccessDialog({ open, onOpenChange, message }: SuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-50">참석 여부 전달 완료</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line text-gray-300">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction
          onClick={() => onOpenChange(false)}
          className="bg-gray-50 text-gray-900 hover:bg-gray-100"
        >
          확인
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}

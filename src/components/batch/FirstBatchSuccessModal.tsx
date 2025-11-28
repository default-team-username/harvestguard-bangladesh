import React from 'react';
import { PartyPopper } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface FirstBatchSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FirstBatchSuccessModal: React.FC<FirstBatchSuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm rounded-2xl p-6 text-center">
        <AlertDialogHeader className="items-center">
          {/* Celebration Icon */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <PartyPopper className="h-8 w-8 text-primary animate-bounce" />
          </div>
          
          {/* Main Heading in Bangla */}
          <AlertDialogTitle className="text-2xl font-bold text-primary">
            আপনি আপনার প্রথম ফসল নিবন্ধন করেছেন!
          </AlertDialogTitle>
          
          {/* Supportive Subtext in Bangla */}
          <AlertDialogDescription className="text-base text-muted-foreground mt-2">
            অভিনন্দন! আপনার তথ্য সফলভাবে সংরক্ষণ করা হয়েছে এবং এখন আপনি আপনার ফসলের ঝুঁকি পর্যবেক্ষণ করতে পারবেন।
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-6 flex justify-center">
          <Button onClick={onClose} className="w-full h-12 text-lg font-semibold rounded-xl">
            ঠিক আছে
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FirstBatchSuccessModal;
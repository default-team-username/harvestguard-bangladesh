import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const QualityInstructionCard: React.FC = () => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  return (
    <Card className="w-full bg-blue-50 border-blue-200 shadow-sm">
      <CardContent className="p-4 flex items-start gap-3">
        <Camera className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-blue-800">
            {getTranslation("AI Crop Quality Scan", "এআই ফসল মান স্ক্যান")}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {getTranslation("Check crop quality using AI technology", "AI প্রযুক্তি ব্যবহার করে ফসলের মান পরীক্ষা করুন")}
          </p>
          <ul className="list-disc list-inside text-xs text-blue-600 mt-2 space-y-1">
            <li>{getTranslation("Take or upload a crop photo", "ফসলের ছবি তুলুন বা আপলোড করুন")}</li>
            <li>{getTranslation("AI will analyze automatically", "AI স্বয়ংক্রিয়ভাবে বিশ্লেষণ করবে")}</li>
            <li>{getTranslation("Get fresh or spoiled results", "তাজা বা নষ্ট ফলাফল পাবেন")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityInstructionCard;
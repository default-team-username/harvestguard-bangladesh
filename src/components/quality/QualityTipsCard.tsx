import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const QualityTipsCard: React.FC = () => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  return (
    <Card className="w-full bg-gray-50 border-border/50 shadow-sm">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-gray-600" />
          <p className="text-base font-semibold text-foreground">
            {getTranslation("Tips for good images:", "ভাল ছবির জন্য টিপস:")}
          </p>
        </div>
        
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>{getTranslation("Use adequate lighting", "পর্যাপ্ত আলোতে ছবি তুলুন")}</li>
          <li>{getTranslation("Get close to the crop", "ফসলের কাছাকাছি যান")}</li>
          <li>{getTranslation("Take a clear, focused picture", "স্পষ্ট ছবি তুলুন")}</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default QualityTipsCard;
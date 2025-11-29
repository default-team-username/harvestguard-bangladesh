import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, XCircle, Gauge, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { QualityResult } from '@/data/qualityData';

interface QualityResultDisplayProps {
  result: QualityResult;
  cropName: string;
}

const QualityResultDisplay: React.FC<QualityResultDisplayProps> = ({ result, cropName }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  let statusTextEn = 'Fresh';
  let statusTextBn = 'তাজা';
  let iconColorClass = 'text-primary';
  let bgColorClass = 'bg-primary';

  if (result.status === 'Medium') {
    statusTextEn = 'Moderate Quality';
    statusTextBn = 'মাঝারি মান';
    iconColorClass = 'text-harvest-yellow';
    bgColorClass = 'bg-harvest-yellow';
  } else if (result.status === 'Spoiled') {
    statusTextEn = 'Spoiled';
    statusTextBn = 'নষ্ট';
    iconColorClass = 'text-destructive';
    bgColorClass = 'bg-destructive';
  } 
  
  const StatusIcon = result.status === 'Fresh' ? CheckCircle : result.status === 'Medium' ? AlertTriangle : XCircle;

  // Custom style for the green card background based on the provided CSS
  const safeCardStyle = {
    background: '#F0FDF4',
    border: '1.6px solid #7BF1A8',
  };
  
  const isFresh = result.status === 'Fresh';

  return (
    <div className="w-full space-y-6">
      {/* --- 1. Quality Result Card --- */}
      <Card className={cn("w-full p-6 shadow-xl", isFresh ? 'bg-green-50 border-green-400' : 'bg-white border-border/50')} style={isFresh ? safeCardStyle : {}}>
        <CardContent className="p-0 flex flex-col items-center text-center">
          
          {/* Icon */}
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
            <StatusIcon className={cn("h-10 w-10", iconColorClass)} />
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-800 mt-2">
            {getTranslation("AI Quality Evaluation", "এআই মান মূল্যায়ন")}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {getTranslation(`Result for ${cropName}`, `${cropName} এর ফলাফল`)}
          </p>

          {/* Status Badge */}
          <div className={cn("px-6 py-3 rounded-full shadow-md flex items-center gap-2", bgColorClass)}>
            <StatusIcon className="h-5 w-5 text-white" />
            <span className="text-xl font-bold text-white">
              {getTranslation(statusTextEn, statusTextBn)}
            </span>
          </div>
          
          {/* Confidence Score */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Gauge className="h-4 w-4" />
            {getTranslation("Confidence:", "আত্মবিশ্বাস:")}
            <span className={cn("font-bold", iconColorClass)}>{result.confidence}%</span>
          </div>

          {/* Guidance Box */}
          <div className="mt-8 w-full p-4 bg-white border border-green-200 rounded-xl text-left">
            <p className="text-base font-semibold text-gray-700">
              {getTranslation(result.guidanceEn, result.guidanceBn)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {getTranslation("AI Guidance", "এআই নির্দেশনা")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- 2. Treatment Plan Card (Only shown for threats) --- */}
      {result.treatmentPlanEn && result.treatmentPlanBn && (
        <Card className="w-full p-6 shadow-lg border-border/50 bg-blue-50 border-blue-200">
          <CardContent className="p-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-5 w-5 text-blue-700" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-blue-800">
                  {getTranslation("Hyperlocal Treatment Plan", "হাইপারলোকাল চিকিৎসা পরিকল্পনা")}
                </h3>
                <p className="text-xs text-blue-600">
                  {getTranslation("Specific actions for your location", "আপনার অবস্থানের জন্য নির্দিষ্ট কাজ")}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                {getTranslation(result.treatmentPlanEn, result.treatmentPlanBn)}
              </pre>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              {getTranslation(
                "This plan is generated based on your location, crop type, and current weather conditions.",
                "এই পরিকল্পনা আপনার অবস্থান, ফসলের ধরন এবং বর্তমান আবহাওয়ার উপর ভিত্তি করে তৈরি করা হয়েছে।"
              )}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Back Button */}
      <Button 
        onClick={() => navigate('/dashboard')}
        variant="outline" 
        className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/10"
      >
        {getTranslation("Back to Dashboard", "ড্যাশবোর্ডে ফিরে যান")}
      </Button>
    </div>
  );
};

export default QualityResultDisplay;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import BottomNavBar from '@/components/layout/BottomNavBar';
import QualityInstructionCard from '@/components/quality/QualityInstructionCard';
import QualityTipsCard from '@/components/quality/QualityTipsCard';
import ImageUploadCard from '@/components/quality/ImageUploadCard';
import QualityResultDisplay from '@/components/quality/QualityResultDisplay';
import { QualityResult } from '@/data/qualityData';

const MOCK_CROP_NAME = 'Paddy/Rice'; // Mock crop name for display purposes

const QualityEvaluationPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);
  
  const [qualityResult, setQualityResult] = useState<QualityResult | null>(null);

  const handleAnalyze = (result: QualityResult) => {
    setQualityResult(result);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center pb-20 md:pb-0"
      style={{ 
        // Background gradient based on user spec: #FAF5FF to #FFFFFF
        background: 'linear-gradient(180deg, hsl(270 100% 97%) 0%, hsl(0 0% 100%) 100%)',
      }}
    >
      {/* Header Section (Purple Gradient Background) */}
      <header className="sticky top-0 z-10 w-full shadow-md rounded-b-3xl p-4 pb-6"
        style={{
          // Gradient based on user spec: #9810FA (Purple)
          background: 'linear-gradient(90deg, #9810FA 0%, #E60076 100%)',
        }}
      >
        <div className="container mx-auto flex flex-col gap-2 px-0 max-w-md">
          {/* Top Bar */}
          <div className="flex items-center gap-3 h-10">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)} // Go back to previous page (Batch Details or Dashboard)
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* Title Container */}
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-white">
                {getTranslation("Quality Scan", "মান পরীক্ষা")}
              </h1>
              <p className="text-sm font-normal text-purple-100">
                {getTranslation("AI Crop Evaluation", "এআই ফসল মূল্যায়ন")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 w-full max-w-md space-y-6 py-6">
        
        {qualityResult ? (
          <QualityResultDisplay result={qualityResult} cropName={MOCK_CROP_NAME} />
        ) : (
          <>
            {/* 1. Instructions Card */}
            <QualityInstructionCard />

            {/* 2. Image Upload Card */}
            <ImageUploadCard onAnalyze={handleAnalyze} cropName={MOCK_CROP_NAME} />

            {/* 3. Tips Card */}
            <QualityTipsCard />
          </>
        )}
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default QualityEvaluationPage;
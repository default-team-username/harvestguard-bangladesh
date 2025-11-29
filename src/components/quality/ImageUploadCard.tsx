import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { QualityResult, generateMockQualityResult } from '@/data/qualityData';
import { cn } from '@/lib/utils';

interface ImageUploadCardProps {
  onAnalyze: (result: QualityResult) => void;
  cropName: string;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({ onAnalyze, cropName }) => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error(getTranslation("Please select an image first.", "প্রথমে একটি ছবি নির্বাচন করুন।"));
      return;
    }

    setIsAnalyzing(true);
    const loadingToastId = toast.loading(getTranslation('Analyzing image...', 'ছবি বিশ্লেষণ করা হচ্ছে...'));

    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = generateMockQualityResult(selectedFile.name);
    onAnalyze(result);
    
    setIsAnalyzing(false);
    toast.success(getTranslation('Analysis complete!', 'বিশ্লেষণ সম্পন্ন!'), { id: loadingToastId });
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full p-6 shadow-2xl border-border/50 rounded-2xl">
      <CardContent className="p-0 space-y-6">
        
        {/* Upload Area */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
            <Camera className="h-10 w-10 text-purple-700" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            {getTranslation("Upload Image", "ছবি আপলোড করুন")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getTranslation(`Upload Image of ${cropName}`, `${cropName} এর ছবি আপলোড করুন`)}
          </p>
        </div>

        {/* Image Preview */}
        {previewUrl ? (
          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-primary/50 shadow-inner">
            <img src={previewUrl} alt="Crop Preview" className="w-full h-full object-cover" />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={handleRemoveImage}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
            <p className="text-muted-foreground text-sm">
              {getTranslation("No image selected", "কোন ছবি নির্বাচন করা হয়নি")}
            </p>
          </div>
        )}

        {/* File Input Button */}
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 rounded-xl"
            disabled={isAnalyzing}
          >
            <Upload className="h-5 w-5" />
            {getTranslation("Take Photo / Select Image", "ছবি তুলুন / ছবি নির্বাচন করুন")}
          </Button>

          <Button 
            onClick={handleAnalyze}
            className={cn("w-full h-12 font-semibold rounded-xl", selectedFile ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed')}
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing 
              ? getTranslation("Analyzing...", "বিশ্লেষণ হচ্ছে...") 
              : getTranslation("Analyze Quality", "মান বিশ্লেষণ করুন")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadCard;
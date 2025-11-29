import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Sparkles, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { toast } from 'sonner';

const VoicePage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useSession();
  
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Mock common questions data
  const commonQuestions = [
    {
      bn: 'আজকের আবহাওয়া কেমন?',
      en: 'How is today\'s weather?',
    },
    {
      bn: 'আমার ধানের অবস্থা কী?',
      en: 'What is my crop status?',
    },
    {
      bn: 'গুদামে কী করব?',
      en: 'What to do in storage?',
    },
    {
      bn: 'কবে ধান কাটব?',
      en: 'When to harvest?',
    },
    {
      bn: 'কবে বিক্রি করব?',
      en: 'When to sell?',
    },
  ];

  // Handle voice recognition (mock implementation)
  const handleVoiceRecognition = () => {
    if (isListening) {
      setIsListening(false);
      toast.success(getTranslation('Voice input received!', 'ভয়েস ইনপুট পাওয়া গেছে!'));
      // In a real app, you would process the transcript here
      return;
    }
    
    setIsListening(true);
    setTranscript('');
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript(getTranslation('How is today\'s weather?', 'আজকের আবহাওয়া কেমন?'));
      toast.info(getTranslation('Listening... Speak now', 'শোনা হচ্ছে... এখন কথা বলুন'));
    }, 500);
  };

  // Handle common question selection
  const handleQuestionSelect = (question: string) => {
    setTranscript(question);
    toast.info(getTranslation(`Selected: ${question}`, `নির্বাচিত: ${question}`));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isListening) {
        setIsListening(false);
      }
    };
  }, [isListening]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center pb-20 md:pb-0"
      style={{ 
        background: 'linear-gradient(180deg, #FAF5FF 0%, #FDF2F8 50%, #FFFFFF 100%)',
      }}
    >
      {/* Header Section (Purple Gradient Background) */}
      <header className="sticky top-0 z-10 w-full shadow-md rounded-b-3xl p-4 pb-6"
        style={{
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
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            {/* Title Container */}
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-white">
                {getTranslation("Voice Assistant", "ভয়েস সহায়ক")}
              </h1>
              <p className="text-sm font-normal text-purple-100">
                {getTranslation("Ask in Bangla", "বাংলায় প্রশ্ন করুন")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 w-full max-w-md space-y-6 py-6">
        
        {/* Instructions Card */}
        <Card className="w-full bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">
                {getTranslation("How to use", "কীভাবে ব্যবহার করবেন")}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {getTranslation(
                  "• Press the mic button and ask questions in Bangla.",
                  "• মাইক বাটনে চাপ দিন এবং বাংলায় প্রশ্ন করুন।"
                )}
              </p>
              <p className="text-xs text-blue-500 mt-1 font-medium">
                {getTranslation(
                  "Instantly identify the threat, assess the risk, and generate a hyper-local, grounded, and specific treatment plan entirely in Bangla.",
                  "তাৎক্ষণিকভাবে হুমকি শনাক্ত করুন, ঝুঁকি মূল্যায়ন করুন এবং সম্পূর্ণ বাংলায় একটি হাইপার-লোকাল, বাস্তবসম্মত ও নির্দিষ্ট প্রতিকার পরিকল্পনা তৈরি করুন।"
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Voice Input Button */}
        <div className="flex justify-center py-8">
          <Button
            onClick={handleVoiceRecognition}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-3 shadow-lg transform transition-all duration-200 ${
              isListening 
                ? 'scale-110 bg-gradient-to-br from-purple-600 to-pink-600' 
                : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            }`}
            disabled={isListening}
          >
            <Mic className={`h-12 w-12 ${isListening ? 'animate-pulse' : ''}`} color="white" />
            <span className="text-white font-bold text-sm">
              {isListening 
                ? getTranslation("Listening...", "শোনা হচ্ছে...") 
                : getTranslation("Ask Question", "প্রশ্ন করুন")}
            </span>
            <span className="text-white text-xs opacity-80">
              {isListening 
                ? getTranslation("Release to stop", "থামাতে ছাড়ুন") 
                : getTranslation("Tap & Speak", "চাপ দিন ও কথা বলুন")}
            </span>
          </Button>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <Card className="w-full bg-secondary/50 border-border/50 shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-foreground">
                {getTranslation("You said:", "আপনি বলেছেন:")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {transcript}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Common Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-bold text-foreground">
              {getTranslation("Common Questions", "সাধারণ প্রশ্ন")}
            </h2>
          </div>
          
          <div className="space-y-3">
            {commonQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full h-auto p-4 text-left border-purple-200 hover:bg-purple-50/50 justify-start"
                onClick={() => handleQuestionSelect(language === 'en' ? question.en : question.bn)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-purple-800">
                    {language === 'en' ? question.en : question.bn}
                  </span>
                  <span className="text-xs text-purple-500 mt-1">
                    {language === 'en' ? question.bn : question.en}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Compatibility Notice Card */}
        <Card className="w-full bg-gray-50 border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <Smartphone className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-foreground">
                {getTranslation("📱 Compatibility:", "📱 সামঞ্জস্যতা:")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {getTranslation(
                  "This feature works best on Chrome, Edge, and Safari browsers. For best results, use in a quiet environment.",
                  "এই ফিচারটি Chrome, Edge, এবং Safari ব্রাউজারে ভালো কাজ করে। ভালো ফলের জন্য নীরব পরিবেশে ব্যবহার করুন।"
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default VoicePage;
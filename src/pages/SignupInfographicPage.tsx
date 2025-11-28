import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sprout, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Infographic steps data
const stepsData = [
  {
    icon: "💰",
    titleEn: "Increase Your Income",
    titleBn: "আয় বৃদ্ধি করুন",
    descEn: "Get maximum price by selling crops at the right time.",
    descBn: "সঠিক সময়ে ফসল বিক্রি করে সর্বোচ্চ মূল্য পান।",
  },
  {
    icon: "🌾",
    titleEn: "Reduce Waste",
    titleBn: "অপচয় কমান",
    descEn: "Know before crops spoil and take quick action.",
    descBn: "ফসল নষ্ট হওয়ার আগেই জানুন এবং দ্রুত ব্যবস্থা নিন।",
  },
  {
    icon: "📱",
    titleEn: "Easy to Use",
    titleBn: "সহজ ব্যবহার",
    descEn: "Easily register crops and see results on mobile.",
    descBn: "মোবাইলে সহজেই ফসল নিবন্ধন করুন এবং ফলাফল দেখুন।",
  },
];

const SignupInfographicPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const totalSteps = stepsData.length;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const getTranslation = (en: string, bn: string) => (language === "en" ? en : bn);

  const handleNext = () => {
    if (current < totalSteps - 1) {
      api?.scrollNext();
    } else {
      // Last step: Navigate to the actual signup form (currently LoginPage)
      navigate("/login"); 
    }
  };

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const isLastStep = current === totalSteps - 1;
  const isFirstStep = current === 0;

  return (
    <div
      className="flex min-h-screen flex-col items-center"
      style={{
        // Replicating the green gradient background
        background: "linear-gradient(180deg, hsl(160 100% 37%) 0%, hsl(160 100% 23%) 100%)",
      }}
    >
      {/* Header */}
      <header className="w-full py-4 px-4">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">
              {getTranslation("HarvestGuard", "হারভেস্টগার্ড")}
            </h1>
          </div>
          <p className="text-sm text-green-200">
            {getTranslation("Crop Protection System", "ফসল সুরক্ষা সিস্টেম")}
          </p>
        </div>
      </header>

      {/* Main Content Carousel */}
      <div className="container mx-auto flex flex-grow items-center justify-center py-12">
        <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full max-w-md">
          <CarouselContent>
            {stepsData.map((step, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <Card className="flex h-[400px] flex-col items-center justify-center p-8 text-center shadow-2xl">
                    <div className="mb-6 text-6xl">{step.icon}</div>
                    
                    <h2 className="mb-1 text-xl font-bold text-primary">
                      {getTranslation(step.titleEn, step.titleBn)}
                    </h2>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {getTranslation(
                        index === 0 ? "Increase Your Income" : index === 1 ? "Reduce Waste" : "Easy to Use",
                        index === 0 ? "আয় বৃদ্ধি করুন" : index === 1 ? "অপচয় কমান" : "সহজ ব্যবহার"
                      )}
                    </p>

                    <p className="text-lg font-medium text-foreground">
                      {getTranslation(step.descEn, step.descBn)}
                    </p>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Footer Navigation and Pagination */}
      <footer className="w-full py-6 px-4">
        <div className="container mx-auto flex max-w-md flex-col items-center gap-4">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className={
                  "h-2 rounded-full transition-all duration-300 " +
                  (current === index
                    ? "w-8 bg-white"
                    : "w-2 bg-green-300/50")
                }
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex w-full gap-4">
            <Button
              onClick={handlePrevious}
              disabled={isFirstStep}
              variant="outline"
              className="flex-1 border-white/40 bg-white/20 text-white hover:bg-white/30 disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {getTranslation("Previous", "পূর্ববর্তী")}
            </Button>

            <Button
              onClick={handleNext}
              className="flex-1 bg-white text-primary hover:bg-gray-100"
            >
              {isLastStep
                ? getTranslation("Start", "শুরু করুন")
                : getTranslation("Next", "পরবর্তী")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupInfographicPage;
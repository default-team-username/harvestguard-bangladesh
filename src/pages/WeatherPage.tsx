import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cloud, MapPin, Map, ChevronRight, AlertTriangle, Sun, CloudRain, Zap, Ruler } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import BottomNavBar from '@/components/layout/BottomNavBar';
import WeatherAlertCard from '@/components/weather/WeatherAlertCard';
import DailyForecastDetail from '@/components/weather/DailyForecastDetail';
import { mockAlerts, mockForecast, generalNote } from '@/data/weatherData';

// Helper component for the Map Risk Indicator boxes
const RiskIndicator = ({ emoji, labelEn, labelBn, count, colorClass }: {
  emoji: string;
  labelEn: string;
  labelBn: string;
  count: number;
  colorClass: string;
}) => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  return (
    <div className="flex flex-col items-center p-2 w-1/3 bg-white/70 rounded-xl backdrop-blur-sm border border-border/50">
      <p className="text-xl">{emoji}</p>
      <p className={cn("text-lg font-bold", colorClass)}>{count}</p>
      <p className="text-xs text-muted-foreground">{getTranslation(labelEn, labelBn)}</p>
    </div>
  );
};

const WeatherPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useSession();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);
  
  const userDistrict = user?.user_metadata?.district || 'Dhaka';

  // Mock data for map risk counts
  const mockRiskCounts = [
    { emoji: '🟢', labelEn: 'Low', labelBn: 'নিম্ন', count: 4, colorClass: 'text-primary' },
    { emoji: '🟡', labelEn: 'Moderate', labelBn: 'মাঝারি', count: 5, colorClass: 'text-harvest-yellow' },
    { emoji: '🔴', labelEn: 'High', labelBn: 'উচ্চ', count: 3, colorClass: 'text-destructive' },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center pb-20 md:pb-0"
      style={{ 
        // Light blue gradient background based on design spec (#EFF6FF to #FFFFFF)
        background: 'linear-gradient(180deg, hsl(210 100% 97%) 0%, hsl(0 0% 100%) 100%)',
      }}
    >
      {/* Header Section (Blue Background) */}
      <header className="sticky top-0 z-10 w-full bg-blue-600 shadow-md rounded-b-3xl p-4 pb-8">
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
                {getTranslation("Weather Forecast", "আবহাওয়া পূর্বাভাস")}
              </h1>
              <p className="text-sm font-normal text-blue-200">
                {getTranslation("Next 5 Days", "পরবর্তী ৫ দিন")}
              </p>
            </div>
          </div>
          
          {/* Location */}
          <p className="text-sm font-medium text-blue-200 mt-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            {userDistrict}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 w-full max-w-md space-y-6 py-6">
        
        {/* 1. Immediate Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">
            {getTranslation("Immediate Alerts", "তাৎক্ষণিক সতর্কতা")}
          </h2>
          {mockAlerts.map(alert => (
            <WeatherAlertCard key={alert.id} alert={alert} />
          ))}
        </section>

        {/* 2. Map Preview Card */}
        <Card 
          className="w-full shadow-lg border-2 p-4 space-y-4"
          style={{ 
            // Gradient based on design spec (#EFF6FF to #F0FDF4)
            background: 'linear-gradient(135deg, hsl(130 40% 90%) 0%, hsl(210 100% 97%) 100%)',
            borderColor: 'hsl(210 100% 80%)'
          }}
        >
          <CardContent className="p-0 space-y-4">
            {/* Map Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Map className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-semibold text-blue-800">
                  {getTranslation("Area Map Preview", "এলাকার মানচিত্রের পূর্বরূপ")}
                </h3>
              </div>
            </div>

            {/* Mock Map Image/Placeholder */}
            <div className="relative h-40 w-full bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center text-gray-600 font-semibold">
              {/* Placeholder for Map */}
              <p>{getTranslation("Map Placeholder", "মানচিত্রের স্থান")}</p>
              
              {/* Location Pin (Mock) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <MapPin className="h-8 w-8 text-destructive fill-destructive/80" />
              </div>
              
              {/* Location Label */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-md">
                {getTranslation("Your Location", "আপনার অবস্থান")}
              </div>
            </div>

            {/* Risk Indicators */}
            <div className="flex justify-between gap-2">
              {mockRiskCounts.map((item, index) => (
                <RiskIndicator key={index} {...item} />
              ))}
            </div>

            {/* View Full Map Button */}
            <Button 
              variant="link" 
              className="w-full text-blue-600 font-semibold p-0 h-auto justify-center"
              onClick={() => navigate('/dashboard/map')}
            >
              {getTranslation("View Full Map", "পুরো মানচিত্র দেখুন")}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* 3. Detailed 5-Day Forecast */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-bold text-foreground">
              {getTranslation("Detailed Forecast", "বিস্তারিত পূর্বাভাস")}
            </h2>
          </div>
          
          {mockForecast.map((forecast, index) => (
            <DailyForecastDetail key={index} forecast={forecast} />
          ))}
        </section>

        {/* 4. General Note Card */}
        <Card className="w-full bg-gray-50 border-gray-200 shadow-sm">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs font-semibold text-foreground">
              {getTranslation("📌 Remember:", "📌 মনে রাখুন:")}
            </p>
            <p className="text-xs text-muted-foreground">
              {getTranslation(generalNote.en, generalNote.bn)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavBar />
    </div >
  );
};

export default WeatherPage;
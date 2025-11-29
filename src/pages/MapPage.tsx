import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Map, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavBar from '@/components/layout/BottomNavBar';
import InteractiveMap, { FarmerLocation } from '@/components/map/InteractiveMap';
import { getCoordsForDistrict, Coordinates } from '@/utils/location';

// Helper to generate mock farmer locations around a center point
const generateMockFarmers = (center: Coordinates, count: number): FarmerLocation[] => {
  const farmers: FarmerLocation[] = [];
  const risks: FarmerLocation['risk'][] = ['Low', 'Moderate', 'High'];
  for (let i = 0; i < count; i++) {
    farmers.push({
      position: {
        lat: center.lat + (Math.random() - 0.5) * 0.2, // Scatter within a radius
        lng: center.lng + (Math.random() - 0.5) * 0.2,
      },
      risk: risks[Math.floor(Math.random() * risks.length)],
    });
  }
  return farmers;
};

const MapPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useSession();
  
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);
  
  const userDistrict = user?.user_metadata?.district || 'Dhaka';
  const userName = user?.user_metadata?.name || 'Current Farmer';
  
  // Get coordinates for the user's district
  const userCoords = getCoordsForDistrict(userDistrict);
  
  // Generate mock data for other farmers
  const otherFarmers = React.useMemo(() => generateMockFarmers(userCoords, 12), [userCoords]);

  // Calculate risk counts from generated data
  const riskCounts = {
    Low: otherFarmers.filter(f => f.risk === 'Low').length,
    Moderate: otherFarmers.filter(f => f.risk === 'Moderate').length,
    High: otherFarmers.filter(f => f.risk === 'High').length,
  };

  const riskIndicators = [
    { emoji: '🟢', count: riskCounts.Low, labelEn: 'Low Risk', labelBn: 'নিম্ন ঝুঁকি', color: 'text-primary' },
    { emoji: '🟡', count: riskCounts.Moderate, labelEn: 'Moderate', labelBn: 'মাঝারি', color: 'text-harvest-yellow' },
    { emoji: '🔴', count: riskCounts.High, labelEn: 'High Risk', labelBn: 'উচ্চ ঝুঁকি', color: 'text-destructive' },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center pb-20 md:pb-0"
      style={{ 
        background: 'linear-gradient(180deg, hsl(130 40% 90%) 0%, hsl(0 0% 100%) 100%)',
      }}
    >
      {/* Header Section (Green Background) */}
      <header className="sticky top-0 z-10 w-full bg-harvest-green shadow-md rounded-b-3xl p-4 pb-6">
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
                {getTranslation("Area Map", "এলাকার মানচিত্র")}
              </h1>
              <p className="text-sm font-normal text-green-200">
                {getTranslation("Crop Risk Visualization", "ফসল ঝুঁকি দৃশ্যকল্পনা")}
              </p>
            </div>
          </div>
          
          {/* Location */}
          <p className="text-sm font-medium text-green-200 mt-2">
            <MapPin className="inline h-4 w-4 mr-1" />
            {userDistrict}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 w-full max-w-md space-y-6 py-6">
        
        {/* Map Instructions Card */}
        <Card className="w-full bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <Map className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-blue-800">
                {getTranslation("Use the map", "মানচিত্র ব্যবহার করুন")}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {getTranslation(
                  "• Blue pin = Your location. Colored pins = Neighboring crop risks.",
                  "• নীল পিন = আপনার অবস্থান। রঙিন পিন = প্রতিবেশী কৃষকদের ফসল ঝুঁকি।"
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Risk Indicators */}
        <div className="grid grid-cols-3 gap-4">
          {riskIndicators.map((indicator, index) => (
            <Card 
              key={index} 
              className="flex flex-col items-center justify-center p-4 bg-secondary/50 border-border/50 shadow-sm"
            >
              <div className="text-2xl mb-2">{indicator.emoji}</div>
              <div className="text-xl font-bold text-foreground">{indicator.count}</div>
              <div className="text-xs text-muted-foreground text-center mt-1">
                {getTranslation(indicator.labelEn, indicator.labelBn)}
              </div>
            </Card>
          ))}
        </div>

        {/* Map Visualization */}
        <Card className="w-full border-border shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-0 relative h-96 bg-gray-200">
            <InteractiveMap 
              center={userCoords}
              userLocation={{ position: userCoords, name: userName }}
              otherFarmers={otherFarmers}
            />
          </CardContent>
        </Card>

        {/* Privacy Notice Card */}
        <Card className="w-full bg-gray-50 border-border/50 shadow-sm">
          <CardContent className="p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-foreground">
                {getTranslation("🔒 Privacy Protected:", "🔒 গোপনীয়তা সুরক্ষিত:")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {getTranslation(
                  "All neighbor data is completely anonymous. No names or personal details are shared.",
                  "সকল প্রতিবেশীর তথ্য সম্পূর্ণ বেনামী। কোন নাম বা ব্যক্তিগত বিবরণ শেয়ার করা হয় না।"
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

export default MapPage;
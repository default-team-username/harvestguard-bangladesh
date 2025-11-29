import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { DailyForecast } from '@/data/weatherData';
import { Thermometer, Droplet, CloudRain, Sun, Cloud, Zap, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyForecastDetailProps {
  forecast: DailyForecast;
}

// Helper to map icon key to Lucide icon component
const getIconComponent = (iconKey: DailyForecast['icon']) => {
  switch (iconKey) {
    case 'rain':
      return CloudRain;
    case 'sun':
      return Sun;
    case 'cloud':
      return Cloud;
    case 'storm':
      return Zap;
    default:
      return Cloud;
  }
};

// Helper component for individual metric
const MetricItem = ({ icon: Icon, labelEn, labelBn, value, unit, colorClass, subValue }: {
  icon: React.ElementType;
  labelEn: string;
  labelBn: string;
  value: string | number;
  unit?: string;
  colorClass: string;
  subValue?: string;
}) => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  return (
    <div className="flex flex-col items-center p-2 w-1/3">
      <Icon className={cn("h-5 w-5 mb-1", colorClass)} />
      <p className="text-xs text-muted-foreground text-center">
        {getTranslation(labelEn, labelBn)}
      </p>
      <p className={cn("text-lg font-semibold mt-1", colorClass)}>
        {value}{unit}
      </p>
      {subValue && (
        <p className="text-xs text-muted-foreground/80 text-center mt-1">
          {subValue}
        </p>
      )}
    </div>
  );
};

const DailyForecastDetail: React.FC<DailyForecastDetailProps> = ({ forecast }) => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);
  const WeatherIcon = getIconComponent(forecast.icon);

  // Determine rain chance background color
  let rainBgClass = 'bg-gray-200';
  let rainTextColor = 'text-gray-700';
  let rainIntensityTextEn = '';
  let rainIntensityTextBn = '';

  if (forecast.rainChance >= 70) {
    rainBgClass = 'bg-blue-100';
    rainTextColor = 'text-blue-600';
  } else if (forecast.rainChance >= 40) {
    rainBgClass = 'bg-blue-50';
    rainTextColor = 'text-blue-500';
  }

  if (forecast.rainIntensity === 'heavy') {
    rainIntensityTextEn = 'Heavy';
    rainIntensityTextBn = 'ভারী';
  } else if (forecast.rainIntensity === 'moderate') {
    rainIntensityTextEn = 'Moderate';
    rainIntensityTextBn = 'মাঝারি';
  } else {
    rainIntensityTextEn = 'Light';
    rainIntensityTextBn = 'হালকা';
  }

  // Determine temperature color
  const tempColorClass = forecast.tempMax >= 35 ? 'text-destructive' : 'text-harvest-yellow';
  const humidityColorClass = forecast.humidity >= 75 ? 'text-primary' : 'text-gray-700';
  const rainIconColorClass = forecast.rainChance >= 70 ? 'text-blue-600' : 'text-gray-500';

  return (
    <Card className="w-full shadow-lg border-border/50 rounded-xl p-4">
      <CardContent className="p-0 space-y-4">
        {/* Header: Day and Condition */}
        <div className="flex justify-between items-center border-b pb-3 border-border/50">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-foreground">
              {getTranslation(forecast.dayEn, forecast.dayBn)}
            </h4>
            <p className="text-xs text-muted-foreground">
              {format(forecast.date, 'MMM dd')} • {getTranslation(forecast.conditionEn, forecast.conditionBn)}
            </p>
          </div>
          <WeatherIcon className={cn("h-8 w-8", rainIconColorClass)} />
        </div>

        {/* Metrics Row */}
        <div className="flex justify-around items-start">
          <MetricItem
            icon={Thermometer}
            labelEn="Temperature"
            labelBn="তাপমাত্রা"
            value={forecast.tempMax}
            unit="°C"
            colorClass={tempColorClass}
            subValue={`${forecast.tempMin}-${forecast.tempMax}°C`}
          />
          <MetricItem
            icon={Droplet}
            labelEn="Humidity"
            labelBn="আর্দ্রতা"
            value={forecast.humidity}
            unit="%"
            colorClass={humidityColorClass}
          />
          <MetricItem
            icon={CloudRain}
            labelEn="Rain"
            labelBn="বৃষ্টি"
            value={forecast.rainChance}
            unit="%"
            colorClass={rainTextColor}
            subValue={getTranslation(rainIntensityTextEn, rainIntensityTextBn)}
          />
        </div>

        {/* Guidance (if available) */}
        {forecast.guidanceEn && (
          <div className="w-full p-3 bg-secondary rounded-lg border border-border/50">
            <p className="text-sm font-medium text-primary">
              <span className="font-bold mr-1">💡</span>
              {getTranslation(forecast.guidanceEn, forecast.guidanceBn)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyForecastDetail;
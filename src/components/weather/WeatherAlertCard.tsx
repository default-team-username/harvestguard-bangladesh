import React from 'react';
import { AlertTriangle, CloudRain, Sun, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { WeatherAlert } from '@/data/weatherData';

interface WeatherAlertCardProps {
  alert: WeatherAlert;
}

const WeatherAlertCard: React.FC<WeatherAlertCardProps> = ({ alert }) => {
  const { language } = useLanguage();
  const getTranslation = (en: string, bn: string) => (language === 'en' ? en : bn);

  let cardClasses = '';
  let icon: React.ElementType = AlertTriangle;
  let iconBgClass = 'bg-white';
  let iconColorClass = 'text-gray-700';
  let titleColorClass = 'text-foreground';
  let actionColorClass = 'text-primary';

  // Map alert types to colors based on design specs (using closest Tailwind/Design System colors)
  if (alert.type === 'rain') {
    // Red/Destructive theme (Heavy Rain)
    cardClasses = 'bg-red-50 border-red-400';
    icon = CloudRain;
    iconColorClass = 'text-destructive';
    titleColorClass = 'text-destructive/90';
    actionColorClass = 'text-destructive/90';
  } else if (alert.type === 'heat') {
    // Orange/Yellow theme (Very Hot)
    cardClasses = 'bg-yellow-50 border-yellow-400';
    icon = Sun;
    iconColorClass = 'text-harvest-yellow';
    titleColorClass = 'text-harvest-dark';
    actionColorClass = 'text-harvest-dark';
  } else if (alert.type === 'general') {
    // Blue/Primary theme (Rain Coming)
    cardClasses = 'bg-blue-50 border-blue-400';
    icon = CloudRain;
    iconColorClass = 'text-blue-600';
    titleColorClass = 'text-blue-800';
    actionColorClass = 'text-blue-800';
  }

  return (
    <Card className={cn("w-full shadow-lg border-2", cardClasses)}>
      <CardContent className="p-4 space-y-3">
        {/* Header: Icon and Title */}
        <div className="flex items-start gap-3">
          <div className={cn("h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl", iconBgClass)}>
            <AlertTriangle className={cn("h-6 w-6", iconColorClass)} />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className={cn("text-base font-semibold", titleColorClass)}>
              {getTranslation(alert.titleEn, alert.titleBn)}
            </h3>
            <p className="text-xs text-muted-foreground">
              {getTranslation(alert.titleEn.split(': ')[1] || alert.titleEn, alert.titleBn.split(': ')[1] || alert.titleBn)}
            </p>
          </div>
        </div>

        {/* Detail Box */}
        <div className="w-full p-3 bg-white rounded-lg border border-border/50">
          <p className={cn("text-sm font-medium", titleColorClass)}>
            {getTranslation(alert.detailEn, alert.detailBn)}
          </p>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <p className={cn("text-sm font-semibold", actionColorClass)}>
            {getTranslation(alert.actionEn, alert.actionBn)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherAlertCard;
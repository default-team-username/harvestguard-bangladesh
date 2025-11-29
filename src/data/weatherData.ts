import { format, addDays } from 'date-fns';

// --- Types ---
export interface DailyForecast {
  date: Date;
  dayEn: string;
  dayBn: string;
  conditionEn: string;
  conditionBn: string;
  icon: 'rain' | 'sun' | 'cloud' | 'storm';
  tempMin: number;
  tempMax: number;
  humidity: number;
  rainChance: number; // %
  rainIntensity: 'light' | 'moderate' | 'heavy';
  guidanceEn?: string;
  guidanceBn?: string;
}

export interface WeatherAlert {
  id: number;
  type: 'rain' | 'heat' | 'general';
  titleEn: string;
  titleBn: string;
  detailEn: string;
  detailBn: string;
  actionEn: string;
  actionBn: string;
}

// --- Mock Data ---
const today = new Date();

export const mockAlerts: WeatherAlert[] = [
  {
    id: 1,
    type: 'rain',
    titleEn: 'URGENT: Heavy Rain Today',
    titleBn: '⚠️ জরুরি: আজ ভারী বৃষ্টি',
    detailEn: 'Rain expected within 3 hours (85%). Cover harvested paddy immediately.',
    detailBn: 'আগামী ৩ ঘণ্টার মধ্যে বৃষ্টি শুরু হবে (৮৫%)। আজই ধান ঢেকে রাখুন।',
    actionEn: 'Take action now',
    actionBn: '✓ এখনই ব্যবস্থা নিন',
  },
  {
    id: 2,
    type: 'heat',
    titleEn: 'Very Hot Tomorrow',
    titleBn: '🌡️ কাল খুব গরম পড়বে',
    detailEn: 'Temperature will rise to 36°C. Avoid irrigation during noon. Irrigate in the afternoon.',
    detailBn: 'তাপমাত্রা ৩৬°C উঠবে। দুপুরে সেচ দেবেন না। বিকেলের দিকে সেচ দিন।',
    actionEn: 'Irrigate in the afternoon',
    actionBn: '✓ বিকেলে সেচ দিন',
  },
  {
    id: 3,
    type: 'general',
    titleEn: 'Rain Coming in 3 Days',
    titleBn: '☔ আগামী ৩ দিনে বৃষ্টি আসছে',
    detailEn: 'Heavy rain expected for 2 days (70%+). Harvest paddy before the rain starts.',
    detailBn: '২ দিন বৃষ্টি হবে (৭০%+)। বৃষ্টি শুরুর আগেই ধান কেটে ফেলুন।',
    actionEn: 'Harvest quickly',
    actionBn: '✓ তাড়াতাড়ি কাটুন',
  },
];

export const mockForecast: DailyForecast[] = [
  {
    date: today,
    dayEn: 'Today',
    dayBn: 'আজ',
    conditionEn: 'Heavy Rain',
    conditionBn: 'ভারী বৃষ্টি',
    icon: 'storm',
    tempMin: 26,
    tempMax: 34,
    humidity: 75,
    rainChance: 85,
    rainIntensity: 'heavy',
    guidanceEn: 'Cover crops today.',
    guidanceBn: 'আজই ফসল ঢেকে রাখুন।',
  },
  {
    date: addDays(today, 1),
    dayEn: 'Tomorrow',
    dayBn: 'কাল',
    conditionEn: 'Very Hot',
    conditionBn: 'খুব গরম',
    icon: 'sun',
    tempMin: 28,
    tempMax: 38,
    humidity: 68,
    rainChance: 20,
    rainIntensity: 'light',
    guidanceEn: 'Irrigate in the afternoon.',
    guidanceBn: 'কাল বিকেলে সেচ দিন।',
  },
  {
    date: addDays(today, 2),
    dayEn: 'Day 3',
    dayBn: 'পরশু',
    conditionEn: 'Cloudy',
    conditionBn: 'মেঘলা',
    icon: 'cloud',
    tempMin: 27,
    tempMax: 36,
    humidity: 72,
    rainChance: 40,
    rainIntensity: 'moderate',
  },
  {
    date: addDays(today, 3),
    dayEn: 'Day 4',
    dayBn: '৪ দিন পর',
    conditionEn: 'Rain Expected',
    conditionBn: 'বৃষ্টি হবে',
    icon: 'rain',
    tempMin: 25,
    tempMax: 32,
    humidity: 80,
    rainChance: 70,
    rainIntensity: 'heavy',
  },
  {
    date: addDays(today, 4),
    dayEn: 'Day 5',
    dayBn: '৫ দিন পর',
    conditionEn: 'Heavy Rain',
    conditionBn: 'ভারী বৃষ্টি',
    icon: 'storm',
    tempMin: 24,
    tempMax: 30,
    humidity: 85,
    rainChance: 90,
    rainIntensity: 'heavy',
  },
];

export const generalNote = {
    en: "Rain 70%+ means heavy rain expected. Temperature 35°C+ means heat stress.",
    bn: "বৃষ্টি ৭০%+ মানে নিশ্চিত বৃষ্টি হবে। তাপমাত্রা ৩৫°C+ মানে তাপের চাপ।",
};
export interface QualityResult {
  status: 'Fresh' | 'Spoiled' | 'Medium';
  confidence: number; // 0-100
  guidanceEn: string;
  guidanceBn: string;
}

// Mock logic for quality prediction based on a random outcome
export const generateMockQualityResult = (fileName: string): QualityResult => {
  // Simple mock logic: 30% chance of spoiled, 20% medium, 50% fresh
  const random = Math.random();
  
  if (random < 0.3) {
    return {
      status: 'Spoiled',
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      guidanceEn: "High spoilage detected. Dispose of this batch immediately to prevent contamination.",
      guidanceBn: "উচ্চ মাত্রার পচন শনাক্ত হয়েছে। সংক্রমণ রোধে অবিলম্বে এই ব্যাচটি সরিয়ে ফেলুন।",
    };
  } else if (random < 0.5) {
    return {
      status: 'Medium',
      confidence: Math.floor(Math.random() * 20) + 60, // 60-80%
      guidanceEn: "Moderate quality issues. Consider immediate processing or sale.",
      guidanceBn: "মাঝারি মানের সমস্যা। অবিলম্বে প্রক্রিয়াকরণ বা বিক্রির কথা বিবেচনা করুন।",
    };
  } else {
    return {
      status: 'Fresh',
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      guidanceEn: "Excellent quality. Continue current storage practices.",
      guidanceBn: "চমৎকার মান। বর্তমান সংরক্ষণ পদ্ধতি চালিয়ে যান।",
    };
  }
};
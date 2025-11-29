export interface QualityResult {
  status: 'Fresh' | 'Spoiled' | 'Medium';
  confidence: number; // 0-100
  guidanceEn: string;
  guidanceBn: string;
  treatmentPlanEn?: string; // Optional treatment plan in English
  treatmentPlanBn?: string; // Optional treatment plan in Bengali
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
      treatmentPlanEn: "1. Isolate affected crops immediately\n2. Apply fungicide treatment (Carbendazim 0.1%)\n3. Improve ventilation in storage area\n4. Monitor neighboring batches for contamination",
      treatmentPlanBn: "১. প্রভাবিত ফসল তাৎক্ষণিকভাবে আলাদা করুন\n২. ছত্রাকনাশক স্প্রে (কার্বেন্ডাজিম ০.১%) প্রয়োগ করুন\n৩. সংরক্ষণ এলাকার বাতাসচলাচল উন্নত করুন\n৪. পার্শ্ববর্তী ব্যাচগুলো পর্যবেক্ষণ করুন"
    };
  } else if (random < 0.5) {
    return {
      status: 'Medium',
      confidence: Math.floor(Math.random() * 20) + 60, // 60-80%
      guidanceEn: "Moderate quality issues. Consider immediate processing or sale.",
      guidanceBn: "মাঝারি মানের সমস্যা। অবিলম্বে প্রক্রিয়াকরণ বা বিক্রির কথা বিবেচনা করুন।",
      treatmentPlanEn: "1. Reduce moisture level to below 14%\n2. Apply natural preservative (Neem oil 2ml per liter)\n3. Check storage temperature (should be 20-25°C)\n4. Re-sort crops to remove damaged ones",
      treatmentPlanBn: "১. আর্দ্রতা মাত্রা ১৪% এর নিচে আনুন\n২. প্রাকৃতিক সংরক্ষণ স্প্রে (নিম তেল ২মিলি প্রতি লিটার)\n৩. সংরক্ষণ তাপমাত্রা পরীক্ষা করুন (২০-২৫°C হতে হবে)\n৪. ক্ষতিগ্রস্ত ফসল বাছাই করে ফেলুন"
    };
  } else {
    return {
      status: 'Fresh',
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      guidanceEn: "Excellent quality. Continue current storage practices.",
      guidanceBn: "চমৎকার মান। বর্তমান সংরক্ষণ পদ্ধতি চালিয়ে যান।",
      // No treatment plan for fresh crops
    };
  }
};
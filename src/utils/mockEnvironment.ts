export interface EnvironmentDefaults {
  storageTemperature: number;
  moistureLevel: number;
}

/**
 * Provides mock environmental defaults based on the user's district.
 * This simulates fetching hyper-local data.
 * @param district The user's district.
 * @returns Mock temperature and moisture defaults.
 */
export const getMockEnvironmentDefaults = (district: string): EnvironmentDefaults => {
  // Simple logic: Districts closer to the coast/rivers might have higher moisture.
  
  const lowerMoistureDistricts = ['Rajshahi', 'Rangpur'];
  const higherTempDistricts = ['Khulna', 'Dhaka'];

  let storageTemperature = 28; // Default average
  let moistureLevel = 65; // Default average

  if (lowerMoistureDistricts.includes(district)) {
    moistureLevel = 60;
  } else if (district === 'Barisal' || district === 'Chittagong') {
    moistureLevel = 70;
  }

  if (higherTempDistricts.includes(district)) {
    storageTemperature = 30;
  } else if (district === 'Sylhet') {
    storageTemperature = 26;
  }

  // Add a small random variance for realism
  storageTemperature += Math.floor(Math.random() * 3) - 1; // +/- 1 degree
  moistureLevel += Math.floor(Math.random() * 5) - 2; // +/- 2 percentage points

  return {
    storageTemperature: Math.max(20, storageTemperature),
    moistureLevel: Math.max(50, Math.min(80, moistureLevel)),
  };
};
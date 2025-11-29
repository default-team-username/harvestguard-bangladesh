export interface Coordinates {
  lat: number;
  lng: number;
}

const districtCoordinates: { [key: string]: Coordinates } = {
  "Dhaka": { lat: 23.8103, lng: 90.4125 },
  "Chittagong": { lat: 22.3569, lng: 91.7832 },
  "Rajshahi": { lat: 24.3745, lng: 88.6042 },
  "Khulna": { lat: 22.8456, lng: 89.5403 },
  "Barisal": { lat: 22.7010, lng: 90.3535 },
  "Sylhet": { lat: 24.8949, lng: 91.8687 },
  "Rangpur": { lat: 25.7439, lng: 89.2752 },
  "Mymensingh": { lat: 24.7471, lng: 90.4203 },
  "Comilla": { lat: 23.4607, lng: 91.1809 },
  "Narayanganj": { lat: 23.6238, lng: 90.5000 },
};

const DEFAULT_COORDS: Coordinates = districtCoordinates["Dhaka"];

export const getCoordsForDistrict = (district: string): Coordinates => {
  return districtCoordinates[district] || DEFAULT_COORDS;
};
export interface ApiKeys {
  gemini: string;
  weather: string;
  elevenlabs: string;
  [key: string]: string; // Allow for other keys
}

// Mock storage for API keys (simulating a secure database/vault)
const MOCK_API_KEYS: ApiKeys = {
  gemini: 'MOCK_GEMINI_API_KEY_12345',
  weather: 'MOCK_WEATHER_API_KEY_67890', 
  elevenlabs: 'MOCK_ELEVENLABS_API_KEY_ABCDE',
};

/**
 * Retrieves a mock API key by name.
 * @param keyName The name of the API key (e.g., 'gemini', 'weather').
 * @returns The mock key string.
 * @throws Error if the key is not found.
 */
export const getApiKey = (keyName: keyof ApiKeys): string => {
  const key = MOCK_API_KEYS[keyName];
  if (!key) {
    throw new Error(`Mock API Key '${keyName}' not found in the database.`);
  }
  return key;
};

/**
 * Adds or updates a mock API key.
 * NOTE: In a real application, this would be a server-side operation.
 * Here, we simulate saving it to the mock DB object.
 * @param keyName The name of the key.
 * @param keyValue The value of the key.
 */
export const setApiKey = (keyName: string, keyValue: string): void => {
  MOCK_API_KEYS[keyName] = keyValue;
  console.log(`Mock API Key '${keyName}' updated successfully.`);
};
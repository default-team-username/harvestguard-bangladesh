import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BatchFormValues, PredictionResult } from '@/data/batchData';

// Define the structure of a stored batch
export interface StoredBatch {
  data: BatchFormValues;
  prediction: PredictionResult;
  id: string;
  registrationDate: Date;
}

interface BatchContextType {
  batches: StoredBatch[];
  addBatch: (data: BatchFormValues, prediction: PredictionResult) => void;
}

const BatchContext = createContext<BatchContextType | undefined>(undefined);
const BATCH_STORAGE_KEY = 'harvestguard_batches';

export const BatchProvider = ({ children }: { children: ReactNode }) => {
  const [batches, setBatches] = useState<StoredBatch[]>(() => {
    // Initialize state from local storage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(BATCH_STORAGE_KEY);
      if (stored) {
        try {
          // Parse stored data, ensuring dates are correctly handled
          const parsed: StoredBatch[] = JSON.parse(stored);
          return parsed.map(batch => ({
            ...batch,
            data: {
              ...batch.data,
              // Ensure harvestDate is converted back to a Date object
              harvestDate: new Date(batch.data.harvestDate),
            },
            registrationDate: new Date(batch.registrationDate),
          }));
        } catch (e) {
          console.error("Failed to parse stored batches:", e);
          return [];
        }
      }
    }
    return [];
  });

  const addBatch = (data: BatchFormValues, prediction: PredictionResult) => {
    const newBatch: StoredBatch = {
      data,
      prediction,
      id: Date.now().toString(), // Simple unique ID
      registrationDate: new Date(),
    };

    setBatches(prevBatches => {
      const updatedBatches = [newBatch, ...prevBatches];
      // Update local storage
      localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(updatedBatches));
      return updatedBatches;
    });
  };

  return (
    <BatchContext.Provider value={{ batches, addBatch }}>
      {children}
    </BatchContext.Provider>
  );
};

export const useBatch = () => {
  const context = useContext(BatchContext);
  if (context === undefined) {
    throw new Error('useBatch must be used within a BatchProvider');
  }
  return context;
};
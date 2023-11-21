// src/types.ts

export interface CrimeData {
    unique_key: string;
    date: string;
    primary_type: string;
    description: string;
    location_description: string;
    arrest: boolean;
    domestic: boolean;
    district: number;
    latitude: number;
    longitude: number;
  }
  
  // El tipo de datos para la lista de crímenes
  export type CrimeDataList = CrimeData[];
  
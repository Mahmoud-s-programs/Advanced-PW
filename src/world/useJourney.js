import { createContext, useContext } from 'react';

export const JourneyContext = createContext(null);
export function useJourney() { return useContext(JourneyContext); }

export interface UserProfile {
  name: string;
  headline: string;
  skills: string[];
  education: string;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'specialist';
}

export interface Availability {
  availableToday: boolean;
  availableTomorrow: boolean;
  weekDays: boolean;
  weekends: boolean;
  hoursPerDay: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: string;
  urgencyLevel: 'alta' | 'media' | 'baixa';
  skillsRequired: string[];
  location: string;
  companyName: string;
  type: 'substituicao' | 'projeto' | 'pico_demanda';
}

export enum AppRoute {
  MATCHES = 'matches',
  PROFILE = 'profile',
  AVAILABILITY = 'availability'
}
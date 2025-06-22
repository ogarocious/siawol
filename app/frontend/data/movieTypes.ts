// app/frontend/data/movieTypes.ts
export interface Movie {
  title: string;
  englishOtherTitles?: string;
  type: string;
  length?: string;
  genre: string;
  subgenre?: string;
  continent: string;
  country: string;
  countryFlag: string;
  decade: string;
  year: number;
  language?: string;
  director: string;
  broadThemes?: string;
  specificThemes?: string;
  synopsis?: string;
  additionalInfo?: string;
  onlineLocation?: string;
  notes?: string;
  socialMediaPost?: string;
  attachments?: string;
}

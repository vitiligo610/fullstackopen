export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy'
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor'
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryEntryState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  data: DiaryEntry[];
}

export type EntriesProps = Omit<DiaryEntryState, 'error'>;

export interface EntryProps {
  entry: DiaryEntry;
}

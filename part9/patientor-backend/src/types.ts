export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'Low' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  employerName?: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationHealthEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  sickLeave?: SickLeave;
}

export interface HospitalDischarge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: HospitalDischarge;
}

export type Entry = HospitalEntry | OccupationHealthEntry | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewBaseEntry = UnionOmit<BaseEntry, 'id'>

export type NewEntry = UnionOmit<Entry, 'id'>

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  ssn: string;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatientData = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

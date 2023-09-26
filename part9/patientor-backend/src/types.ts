export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female'
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  ssn: string;
  occupation: string;
};

export type NonSensitivePatientData = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
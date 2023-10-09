import { Patient, NonSensitivePatientData, NewPatient, NewEntry } from '../types';
import data from '../../data/patients';
import { v4 as uuid } from 'uuid';

const getPatientData = (): Patient[] => {
  return data;
};

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient => {
  const patient = data.find((p) => p.id === id);
  if (patient) {
    const { id, name, ssn, dateOfBirth, gender, occupation, entries } = patient;
    return {
      id,
      name,
      ssn,
      dateOfBirth,
      gender,
      occupation,
      entries
    };
  }
  throw new Error('Patient not found');
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  data.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
}

export default {
  getPatientData,
  getNonSensitivePatientData,
  getPatientById,
  addPatient,
  addEntry
};

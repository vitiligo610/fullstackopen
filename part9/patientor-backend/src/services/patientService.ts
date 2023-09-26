import { Patient, NonSensitivePatientData, NewPatient } from '../types';
import data from '../../data/patients';
import { v4 as uuid } from 'uuid';

const getPatientData = (): Patient[] => {
  return data;
}

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  data.push(newPatient);
  return newPatient;
}

export default {
  getPatientData,
  getNonSensitivePatientData,
  addPatient
}
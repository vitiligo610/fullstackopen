import { Patient, NonSensitivePatientData } from '../types';
import data from '../../data/patients'

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

export default {
  getPatientData,
  getNonSensitivePatientData
}
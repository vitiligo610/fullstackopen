import { Diagnosis } from '../types';
import data from '../../data/diagnoses';

const getDiagnoses = (): Diagnosis[] => {
  return data;
}

export default {
  getDiagnoses
}
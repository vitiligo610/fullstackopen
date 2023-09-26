/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient({
      ...newPatient
    });

    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something unexpected happened: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.send(errorMessage);
  }
});

export default router;

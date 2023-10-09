/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatientById(id));
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

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).send('patient not found');
    }

    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    return res.json({ addedEntry });
  } catch (error: unknown) {
    let errorMessage = 'An error occured: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import {
  Diagnosis,
  Entry,
  Patient,
  HealthCheckRating,
  NewEntry
} from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Button } from '@mui/material';

import axios from 'axios';
import AddEntryModal from '../AddEntryModal';

interface Props {
  diagnoses: Diagnosis[];
}

const HealthRating = (health: HealthCheckRating) => {
  switch (health) {
    case 0:
      return <FavoriteIcon sx={{ color: 'green' }} />;
    case 1:
      return <FavoriteIcon sx={{ color: 'yellow' }} />;
    case 2:
      return <FavoriteIcon sx={{ color: 'blue' }} />;
    case 3:
      return <FavoriteIcon sx={{ color: 'red' }} />;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${value}`);
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <div>{HealthRating(entry.healthCheckRating)}</div>;
    case 'Hospital':
      return (
        <div>
          <p>Discharge date: {entry.discharge.date}</p>
          <ul>
            <li>
              criteria: <i>{entry.discharge.criteria}</i>
            </li>
          </ul>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          {entry.sickLeave ? (
            <p>
              SICK LEAVE: {entry.sickLeave.startDate} -{' '}
              {entry.sickLeave.endDate}
            </p>
          ) : null}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      console.log('sending request');
      if (id) {
        const response = await patientService.getPatient(id);
        setPatient(response);
      }
    };
    void fetchPatient();
  }, [id]);

  useEffect(() => {
    if (patient) {
      const diagnosisCodes = patient.entries.flatMap((e) => e.diagnosisCodes);
      const matchedDiagnoses: Diagnosis[] = [];

      diagnosisCodes.map((c) => {
        const matchedCode = diagnoses.find((d) => d.code === c);
        if (matchedCode) {
          matchedDiagnoses.push(matchedCode);
        }
      });

      setDiagnosis(matchedDiagnoses);
      console.log(diagnosis);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const handleAddEntry = async (values: NewEntry) => {
    try {
      if (patient) {
        const entry = await patientService.addEntry(patient.id, values);
        setPatient({ ...patient, entries: patient.entries.concat(entry) });
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      {patient === null ? (
        <h2>
          <em>Loading data...</em>
        </h2>
      ) : (
        <>
          <h2>
            {patient.name}
            {patient.gender.toString() === 'male' ? (
              <MaleIcon />
            ) : (
              <FemaleIcon />
            )}
          </h2>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
          <h2>Entries</h2>
          <Button variant='contained' onClick={openModal}>Add new entry</Button>
          <AddEntryModal
            modalOpen={modalOpen}
            onClose={closeModal}
            error={error}
            onSubmit={handleAddEntry}
            diagnoses={diagnoses}
          />
          {patient?.entries.map((e) => {
            return (
              <div key={e.id}>
                <Box
                  sx={{
                    border: '1px solid black',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    marginBottom: '10px'
                  }}
                >
                  {e.date}
                  {e.type === 'OccupationalHealthcare' ? (
                    e.employerName ? (
                      <>
                        <WorkIcon /> {e.employerName}
                      </>
                    ) : (
                      <WorkIcon />
                    )
                  ) : (
                    <MedicalServicesIcon />
                  )}
                  <br />
                  <i>{e.description}</i>
                  {/* <ul>
                    {e.diagnosisCodes?.map((d) => {
                      const diagnosis = diagnoses.find(
                        (diagnose) => diagnose.code === d
                      )?.name;
                      return (
                        <li key={d}>
                          {d} {diagnosis ? diagnosis : null}
                        </li>
                      );
                    })}
                  </ul> */}
                  <EntryDetails entry={e} />
                  diagnose by {e.specialist}
                </Box>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PatientPage;

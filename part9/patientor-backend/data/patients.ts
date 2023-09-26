import { Patient } from '../src/types';
import toNewPatient from '../src/utils';

const data = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '90786-1223',
    gender: 'male',
    occupation: 'New york city cop'
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '30179-4772',
    gender: 'male',
    occupation: 'Cop'
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '50470-5554',
    gender: 'female',
    occupation: 'Technician'
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '50174-4328',
    gender: 'female',
    occupation: 'Forensic Pathologist'
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '90471-8890',
    gender: 'male',
    occupation: 'Digital evangelist'
  }
];

const patientData: Patient[] = data.map((obj) => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patientData;

import {
  Gender,
  NewPatient,
  Diagnosis,
  NewEntry,
  HealthCheckRating,
  NewBaseEntry,
  HospitalDischarge,
  SickLeave
} from './types';

const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Invalid or missing name or occupation');
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date format');
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  const re = /^\d{3}-?\d{2}-?\d{4}$/;
  if (!isString(ssn) || !re.test(ssn)) {
    throw new Error('Invalid ssn format');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Invalid gender: ' + gender);
  }

  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };

    return newPatient;
  }

  throw new Error('Invalid data or missing field');
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect ot missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === 'number' || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('startDate' in object && 'endDate' in object) {
    const sickLeave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate)
    };
    return sickLeave;
  }
  throw new Error('Incorrect data: a field missing');
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect ot missing description');
  }
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};

const parseDischarge = (object: unknown): HospitalDischarge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'criteria' in object) {
    const discharge: HospitalDischarge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria)
    };
    return discharge;
  }
  throw new Error('Incorrect data: a field missing');
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object) {
    const newBaseEntry: NewBaseEntry =
      'diagnosisCodes' in object
        ? {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
          }
        : {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist)
          };

    if ('type' in object) {
      switch (object.type) {
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            const healthCheckEntry: NewEntry = {
              ...newBaseEntry,
              type: 'HealthCheck',
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating
              )
            };
            return healthCheckEntry;
          }
          throw new Error('Incorrect data: health check rating missing');

        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            let occupationalHealthcareEntry: NewEntry;

            'sickLeave' in object
              ? (occupationalHealthcareEntry = {
                  ...newBaseEntry,
                  type: 'OccupationalHealthcare',
                  employerName: parseEmployerName(object.employerName),
                  sickLeave: parseSickLeave(object.sickLeave)
                })
              : (occupationalHealthcareEntry = {
                  ...newBaseEntry,
                  type: 'OccupationalHealthcare',
                  employerName: parseEmployerName(object.employerName)
                });
            return occupationalHealthcareEntry;
          }
          throw new Error('Incorrect data: employer name missing');

        case 'Hospital':
          if ('discharge' in object) {
            const hospitalEntry: NewEntry = {
              ...newBaseEntry,
              type: 'Hospital',
              discharge: parseDischarge(object.discharge)
            };
            return hospitalEntry;
          }
          throw new Error('Incorrect data: discharge missing');
      }
    }
  }
  throw new Error('Incorrect data or missing field');
};

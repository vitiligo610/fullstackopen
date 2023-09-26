import { Gender, NewPatient } from './types';

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

const parseDob = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect date format');
  }

  return dob;
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

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Invalid or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDob(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };

    return newPatient;
  }

  throw new Error('Invalid data or missing field');
};

export default toNewPatient;

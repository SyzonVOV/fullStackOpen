import { Gender, NewPatientsEntry } from '../types';


const toNewPatientEntry = (data: { [key: string]: unknown }): NewPatientsEntry => {
  const newEntry: NewPatientsEntry = {
    name: parseString(data.name),
    dateOfBirth: parseDate(data.dateOfBirth),
    gender: parseGender(data.gender),
    ssn: parseString(data.ssn),
    occupation: parseString(data.occupation)
  };

  return newEntry;
};

const parseString = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date as string}`);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + (gender as string));
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;
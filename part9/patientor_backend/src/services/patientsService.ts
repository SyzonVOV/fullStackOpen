import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.json';
import { Patients, NonSensitivePatientsEntry, NewPatientsEntry } from '../types';

const getEntries = (): Array<Patients> => {
  return patients as Array<Patients>;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return (patients as NonSensitivePatientsEntry[]).map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  })) ;
};

const addEntry = (entry: NewPatientsEntry):Patients => {
  const newDiaryEntry = {
    id: uuid(),
    ...entry
  };
  
  patients.push(newDiaryEntry);
  return newDiaryEntry;
  };

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries
};
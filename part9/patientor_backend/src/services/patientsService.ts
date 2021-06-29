import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatientsEntry, NewPatientsEntry } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getEntry = (id: string): Patient => {
  return (patients.find(p => p.id === id) as Patient);
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

const addEntry = (entry: NewPatientsEntry): Patient => {
  const newDiaryEntry = {
    id: uuid(),
    ...entry,
    entries: []
  };
  
  patients.push(newDiaryEntry);
  return newDiaryEntry;
  };

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  getEntry
};
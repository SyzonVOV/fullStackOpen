import diagnoses from '../../data/diagnoses.json';

import { Diagnoses } from '../types';

const getEntries = (): Array<Diagnoses> => {
  return diagnoses;
};

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry [] => {
//   return diaries.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry,
  //getNonSensitiveEntries
};
// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export enum Gender {
  Female = 'female',
  Male = 'male'
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<Patients, 'ssn'>;

export type NewPatientsEntry = Omit<Patients, 'id'>;
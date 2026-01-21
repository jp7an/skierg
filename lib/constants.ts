/**
 * Start group thresholds (W/kg) by experience level
 */
export type ExperienceLevel = 'liten' | 'okej' | 'stor';
export type StartGroup = 'Elit' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface ThresholdsMap {
  [key: string]: {
    liten: number;
    okej: number;
    stor: number;
  };
}

export const START_GROUP_THRESHOLDS: ThresholdsMap = {
  Elit: { liten: 3.12, okej: 3.64, stor: 4.45 },
  '1': { liten: 2.66, okej: 3.12, stor: 3.81 },
  '2': { liten: 2.39, okej: 2.82, stor: 3.45 },
  '3': { liten: 2.12, okej: 2.51, stor: 3.08 },
  '4': { liten: 1.94, okej: 2.31, stor: 2.84 },
  '5': { liten: 1.82, okej: 2.17, stor: 2.67 },
  '6': { liten: 1.73, okej: 2.07, stor: 2.54 },
  '7': { liten: 1.65, okej: 1.98, stor: 2.44 },
  '8': { liten: 1.57, okej: 1.89, stor: 2.33 },
  '9': { liten: 1.50, okej: 1.81, stor: 2.24 },
};

export const START_GROUPS: StartGroup[] = ['Elit', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

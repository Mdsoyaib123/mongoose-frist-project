import { Date } from 'mongoose';

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemester = {
  name: 'Autumn' | 'Summer' | 'Fall';
  code: 'o1' | '02' | '03';
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
};

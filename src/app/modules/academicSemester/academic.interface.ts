import { Date } from 'mongoose';

type TMonth =
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
  startMonth: TMonth;
  endMonth: TMonth;
};

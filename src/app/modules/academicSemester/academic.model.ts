import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonths } from './academic.interface';

const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: ['Autumn', 'Summer', 'Fall'],
      },
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: months,
      },
    },
    endMonth: {
      type: String,
      enum: {
        values: months,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);

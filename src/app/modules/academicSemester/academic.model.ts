import { Schema } from 'mongoose';
import { TAcademicSemester } from './academic.interface';

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
    year: Date,
    startMonth: {
      type: String,
      enum: {
        values: [
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
        ],
      },
    },
    endMonth: {
      type: String,
      enum: {
        values: [
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
        ],
      },
    },
  },
  {
    timestamps: true,
  },
);

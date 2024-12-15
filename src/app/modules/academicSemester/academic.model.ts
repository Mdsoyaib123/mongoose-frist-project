import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
} from './academic.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';




export const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: {
        values: Months,
      },
      required:true
    },
    endMonth: {
      type: String,
      enum: {
        values: Months,
      },
      required:true
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

import mongoose, { Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

export const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const academicFacultyModel = mongoose.model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);

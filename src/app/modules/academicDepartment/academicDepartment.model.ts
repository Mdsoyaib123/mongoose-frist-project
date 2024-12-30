import mongoose, {  Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty', // Match the registered model name
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExit = await academicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExit) {
    throw new Error('Department is already exit ');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExit = await academicDepartmentModel.findOne(query);
  if(!isDepartmentExit){
    throw new Error('This department does not exit')
  }
  next()
});

export const academicDepartmentModel = mongoose.model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);

import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

// create schema
const userNameSchema = new Schema<UserName>({
  fristName: { type: String, required: [true, 'Frist Name is required'] },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'Frist Name is required'] },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatheroccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motheroccupation: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user is required '],
    unique:true,
    ref:'userModel'
  },
  name: {
    type: userNameSchema,
    maxlength: 20,
    trim: true,
    required: true,
    _id:false
  },
  gender: {
    type: String,
    enum: {
      values: ['Female', 'Male'],
      message: '{VALUE} IS NOT VALID',
    },
    trim: true,
    required: [true, 'Gender is also required'],
  },
  dateOfBrith: { type: String },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not email type ',
    },
  },
  contactNo: { type: String },
  emergenceContactNo: { type: String },
  bloodGroup: {
    type: String,
    enum: ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'],
    required: true,
  },
  avatar: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
    _id:false
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
});

// create a model
export const StudentModel = model<Student>('student', studentSchema);

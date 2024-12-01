// 1. Create an interface

import { Types } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherContactNo: string;
  fatheroccupation: string;
  motherName: string;
  motherContactNo: string;
  motheroccupation: string;
};
export type UserName = {
  fristName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  user: Types.ObjectId;
  name: UserName;
  gender: 'Male' | 'Female';
  dateOfBrith?: string;
  contactNo: string;
  emergenceContactNo: string;
  bloodGroup?: 'O+' | 'O-' | 'A+' | 'A-' | 'AB+' | 'AB-' | 'B+' | 'B-';
  email: string;
  avatar?: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
};

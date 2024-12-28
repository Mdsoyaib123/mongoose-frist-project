import { z } from 'zod';

// UserName schema
const userNameValidationWithZod = z.object({
  fristName: z.string().nonempty('First Name is required'),
  middleName: z.string().optional(),
  lastName: z.string().nonempty('Last Name is required'),
});

// Guardian schema
const guardianValidationWithZod = z.object({
  fatherName: z.string().nonempty(),
  fatherContactNo: z.string().nonempty(),
  fatheroccupation: z.string().nonempty(),
  motherName: z.string().nonempty(),
  motherContactNo: z.string().nonempty(),
  motheroccupation: z.string().nonempty(),
});

// Local Guardian schema
const localGuardianValidationWithZod = z.object({
  name: z.string().nonempty(),
  occupation: z.string().nonempty(),
  contactNo: z.string().nonempty(),
  address: z.string().nonempty(),
});

// Main Student schema
const createStudentValidationSchemaWithZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationWithZod,
      gender: z.enum(['Female', 'Male']),
      dateOfBrith: z.string().optional(),
      email: z.string().email('Invalid email address').nonempty(),
      contactNo: z.string().nonempty(),
      emergenceContactNo: z.string().nonempty(),
      bloodGroup: z.enum(['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-']),
      avatar: z.string().nonempty(),
      presentAddress: z.string().nonempty(),
      permanentAddress: z.string().nonempty(),
      guardian: guardianValidationWithZod,
      localGuardian: localGuardianValidationWithZod,
      profileImg: z.string().optional(),
      admissionSemester:z.string(),
    }),
  }),
});
export const studentValidations = {
  createStudentValidationSchemaWithZod,
};

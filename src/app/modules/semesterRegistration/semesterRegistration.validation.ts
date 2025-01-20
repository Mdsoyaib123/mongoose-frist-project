import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.string(),
    startDate: z.string().datetime(),
    endDate:  z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};

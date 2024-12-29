import { z } from 'zod';

export const academicFacultyValidationSchema = z.object({
  name: z.string(),
});

export const academicFacultyValidation ={
    academicFacultyValidationSchema
}

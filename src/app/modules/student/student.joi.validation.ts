import Joi from 'joi';

// UserName schema
const userNameValidateSchema = Joi.object({
  fristName: Joi.string().required().messages({
    'string.empty': 'First Name is required',
  }),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last Name is required',
  }),
});

// Guardian schema
const guardianValidateSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  fatheroccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motheroccupation: Joi.string().required(),
});

// Local Guardian schema
const localguardianValidateSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Main Student schema
const studentValidateSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidateSchema.required(),
  gender: Joi.string()
    .valid('Female', 'Male')
    .required()
    .messages({ 'any.only': '{#value} is not a valid gender' }),
  dateOfBrith: Joi.string().optional(), // Can adjust to date validation if needed
  email: Joi.string()
    .email()
    .required()
    .messages({ 'string.email': '{#value} is not a valid email' }),
  contactNo: Joi.string().required(),
  emergenceContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-')
    .required(),
  avatar: Joi.string().required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidateSchema.required(),
  localGuardian: localguardianValidateSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'block')
    .default('active'),
});

export default studentValidateSchema;

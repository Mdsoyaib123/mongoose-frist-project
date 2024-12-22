import catchAsync from '../../../utils/catchAsync';
import { academicSemesterServices } from './academic.service';
import sendResponse from '../../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await academicSemesterServices.createAcademicSemesterIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  // query from DB
  const result = await academicSemesterServices.getAllAcademicSemester();

  // send Res
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester All data is retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  // query from DB
  const result = await academicSemesterServices.getSingleAcademicSemester(
    req.params.semesterId,
  );

  // send res
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester Single Data is retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.semesterId;

  // update at DB
  const result = await academicSemesterServices.updateAcademicSemester(
    id,
    data,
  );
  sendResponse(res,{
    statusCode: 200,
    success: true,
    message: 'Academic semester Data updated successfully',
    data: result,
  })
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};

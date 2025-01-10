import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableField } from './course.constant';
import { TCourse } from './course.interface';
import { courseModel } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload);
  return result;
};
const getAllCourses = async (query:Record<string,unknown>) => {
  const courseQuery = new QueryBuilder(courseModel.find().populate('preRequisiteCourses.course'), query)
  .search(courseSearchableField)
  .filter()
  .sort()
  .paginate()
  .fields()
  
  const result = courseQuery.modelQuery
  return result;
};
const getSingleCourse = async (id: string) => {
  const result = await courseModel.findById(id);
  return result;
};
const deleteCourse = async (id: string) => {
  const result = await courseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};

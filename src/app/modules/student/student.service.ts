
import { StudentModel } from './student.model';


const getAllStudentFromDB = async()=>{
    const result = await StudentModel.find()
    return result;
}
const getSingleStudentFromDB = async (id:string)=>{
    const result = await StudentModel.findOne({id:id});
    return result;
}

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
};

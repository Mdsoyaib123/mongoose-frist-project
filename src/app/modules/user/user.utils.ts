import { userModel } from './user.model';

export const findLastStudentId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: 'student',
      },
      {
        id: 1,
      },
    )
    .sort({
      createdAt: -1,
    });
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload) => {
  // first time 0000
  let currentId =  (0).toString(); 

  const lastStudentId = await findLastStudentId()
  
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4,6) //01
  const lastStudentYear = lastStudentId?.substring(0,4) //2030
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentSemesterYear){
    currentId = lastStudentId.substring(6); //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

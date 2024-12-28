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
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generatedStudentId = async (payload) => {
  // first time 0000
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

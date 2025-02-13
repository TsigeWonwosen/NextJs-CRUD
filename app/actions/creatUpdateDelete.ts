import { deleteStudent, updateStudent, createStudent } from "./studentActions";
import { deleteParent, updateParent, createParent } from "./parentAction";
import { deleteTeacher, createTeacher, updateTeacher } from "./teacherAction";
import { createSubject, deleteSubject, updateSubject } from "./subjectAction";
import { createClass, deleteClass, updateClass } from "./classAction";
import { createExam, deleteExam, updateExam } from "./examAction";

export enum METHOD_TYPE {
  DELETE = "DELETE",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

const methods: any = {
  teacher: [createTeacher, deleteTeacher, updateTeacher],
  student: [createStudent, deleteStudent, updateStudent],
  parent: [createParent, deleteParent, updateParent],
  subject: [createSubject, deleteSubject, updateSubject],
  class: [createClass, deleteClass, updateClass],
  exam: [createExam, deleteExam, updateExam],
};
type ModelName =
  | "teacher"
  | "student"
  | "parent"
  | "class"
  | "subject"
  | "admin";

export const createUpdateDelete = async ({
  model,
  action,
  data,
  id,
}: {
  model: string;
  action: METHOD_TYPE;
  data?: any;
  id?: string | number;
}) => {
  try {
    if (!model) throw new Error("Model name is required");
    switch (action) {
      case METHOD_TYPE.CREATE:
        if (!data) throw new Error("Data is required for CREATE");
        return await methods[model][0](data);

      case METHOD_TYPE.UPDATE:
        if (!id || !data)
          throw new Error("ID and data are required for UPDATE");

        return await methods[model][2](id, data);

      case METHOD_TYPE.DELETE:
        if (!id) throw new Error("ID is required for DELETE");
        await methods[model][1](id);
        break;

      default:
        throw new Error(`Invalid action type: ${action}`);
    }
  } catch (error) {
    console.log(error);
  }
};

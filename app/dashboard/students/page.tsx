import { Class, Student } from "@prisma/client";
import { getStudents } from "../../actions/studentActions";
import StudentClient from "../components/StudentClient";

type StudentType = Student & { class: Class };

async function Students() {
  const { students, totalStudents } = await getStudents();

  return <StudentClient students={students} totalSudents={totalStudents} />;
}

export default Students;

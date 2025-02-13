import { getStudents } from "../../actions/studentActions";
import StudentClient from "../components/StudentClient";

async function Students() {
  const { students, totalStudents } = await getStudents();

  return <StudentClient students={students} totalSudents={totalStudents} />;
}

export default Students;

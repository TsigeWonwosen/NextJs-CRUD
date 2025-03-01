import StudentClient from "../components/StudentClient";
import { getStudents } from "../../actions/studentActions";
import StudentsList from "../components/StudentsList";

async function Students() {
  const { students, totalStudents } = await getStudents();

  const studentsList = students.map((student) => (
    <StudentsList key={student.id} {...student} />
  ));

  return (
    <div className="mx-auto flex h-full w-full flex-col p-4">
      <StudentClient
        students={students}
        totalSudents={totalStudents}
        studentList={studentsList}
      />
      ;
    </div>
  );
}

export default Students;

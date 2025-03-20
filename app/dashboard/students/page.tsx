import StudentClient from "../components/StudentClient";
import { getStudentsWithQuery } from "../../actions/studentActions";
import { prisma } from "@/app/libs/prisma";

async function Students({
  searchParams,
}: {
  searchParams: { search?: string; name?: string; id?: string; sort?: string };
}) {
  const searchParam = await searchParams;
  const { students, totalStudents } = await getStudentsWithQuery(searchParam);

  const studentsUpdated = students.map((student) => ({
    ...student,
    attendances: student.attendances?.map((attendance) => attendance.id),
    results: student.results.map((result) => result.id),
  }));

  const results = await prisma.result.findMany({
    select: {
      id: true,
      studentId: true,
      assignmentId: true,
      examId: true,
      score: true,
    },
  });
  const attendances = await prisma.attendance.findMany({
    select: { id: true, studentId: true, date: true },
  });
  const grades = await prisma.grade.findMany({
    select: { id: true, level: true },
  });
  const classes = await prisma.class.findMany({
    select: { id: true, name: true },
  });

  const parents = await prisma.parent.findMany({
    select: { id: true, name: true, surname: true },
  });

  const relatedData = { results, attendances, grades, classes, parents };

  return (
    <div className="mx-auto flex h-full w-full flex-col rounded-md bg-light-bgw p-5 dark:bg-dark-bg">
      <StudentClient
        students={studentsUpdated}
        totalSudents={totalStudents}
        relatedData={relatedData}
      />
    </div>
  );
}

export default Students;

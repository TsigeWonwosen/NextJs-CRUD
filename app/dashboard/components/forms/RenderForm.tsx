import TeacherForm from "./TeacherForm";
import StudentForm from "./StudentForm";
import ParentForm from "./ParentForm";
import ClassForm from "./ClassForm";
import SubjectForm from "./SubjectForm";

export default function RenderForm({
  table,
  id,
  data,
  title,
  handleToggle,
}: any) {
  // const grades = await prisma.grade.findMany({
  //   select: { id: true, level: true },
  // });
  // const teachers = await prisma.teacher.findMany({
  //   select: { id: true, name: true, surname: true },
  // });

  // const lessons = await prisma.lesson.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     teacher: true,
  //   },
  // });

  switch (table) {
    case "teacher":
      return (
        <TeacherForm
          table={table}
          id={id}
          data={data}
          title={title}
          handleToggle={handleToggle}
        />
      );
    case "student":
      return (
        <StudentForm
          table={table}
          id={id}
          data={data}
          title={title}
          handleToggle={handleToggle}
        />
      );
    case "parent":
      return (
        <ParentForm
          table={table}
          id={id}
          data={data}
          title={title}
          handleToggle={handleToggle}
        />
      );
    case "class":
      return (
        <ClassForm
          table={table}
          id={id}
          data={data}
          title={title}
          handleToggle={handleToggle}
        />
      );
    case "subject":
      return (
        <SubjectForm
          table={table}
          id={id}
          data={data}
          title={title}
          handleToggle={handleToggle}
        />
      );
    case "exam":
      return (
        <ParentForm
          table={table}
          id={id}
          data={data}
          title={title}
          handleToggle={handleToggle}
        />
      );
    default:
      return <div>Select a table to render its form</div>;
  }
}

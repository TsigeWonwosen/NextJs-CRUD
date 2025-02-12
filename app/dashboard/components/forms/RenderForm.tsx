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
    default:
      return <div>Select a table to render its form</div>;
  }
}

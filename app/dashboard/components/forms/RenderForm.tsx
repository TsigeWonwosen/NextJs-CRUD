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
  relatedData,
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
          relatedData={relatedData}
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
          relatedData={relatedData}
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
          relatedData={relatedData}
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
          relatedData={relatedData}
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
          relatedData={relatedData}
        />
      );
    default:
      return <div>Select a table to render its form</div>;
  }
}

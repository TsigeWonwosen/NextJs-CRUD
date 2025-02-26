import { createSubject, updateSubject } from "@/app/actions/subjectAction";
import { SubjectchemaType, SubjectSchema } from "@/app/libs/types";
import { capitalizeTitle } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function SubjectForm({
  handleToggle,
  title,
  table,
  data,
  id,
  relatedData,
}: {
  handleToggle: () => void;
  title: string;
  table: string;
  data?: any;
  id?: string;
  relatedData: any;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubjectchemaType>({ resolver: zodResolver(SubjectSchema) });

  const router = useRouter();
  const onSubmit = (data: SubjectchemaType) => {
    try {
      if (title == "update") {
        if (data.id) {
          updateSubject({
            id: data?.id,
            data: {
              name: data.name,
              id: data.id!,
              teachers: data.teachers!,
              lessons: data.lessons!,
            },
          });
          toast.success("Subject updated succesfully", { autoClose: 3000 });
        }
      } else {
        const res = createSubject(data);
        toast.success("Subject Created succesfully", { autoClose: 3000 });
      }
      reset();
      handleToggle();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const { teachers = [], lessons } = relatedData;
  return (
    <div className="relative z-10 flex h-max w-[450px] flex-col items-center rounded-lg bg-slate-950 p-10 shadow-md">
      <div
        className="z-70 absolute right-4 top-4 h-3 w-3 cursor-pointer"
        onClick={() => handleToggle()}
      >
        <Image src="/close.png" alt="" width={14} height={14} />
      </div>
      <h2 className="mb-4 text-center text-2xl font-bold">
        {capitalizeTitle(table) + " " + capitalizeTitle(title)}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 h-auto w-full bg-slate-950 p-5"
      >
        {title == "update" && (
          <input id="id" hidden defaultValue={data.id} {...register("id")} />
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="username"
            defaultValue={data?.name}
            {...register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>
        {errors?.name && <p className="text-red-400">{errors.name?.message}</p>}
        <div className="mb-4">
          <label
            htmlFor="subjects"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Teachers
          </label>
          <select
            multiple
            id="teachers"
            defaultValue={data?.teachers}
            {...register("teachers")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            {teachers &&
              teachers?.map(
                (teacher: { name: string; surname: string; id: string }) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name + " " + teacher.surname}
                  </option>
                ),
              )}
          </select>
        </div>
        {errors.teachers?.message && (
          <p className="text-red-400">{errors.teachers?.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="lessons"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Lesson
          </label>
          <select
            multiple
            id="lessons"
            defaultValue={data?.lessons.id}
            {...register("lessons")}
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            {lessons &&
              lessons?.map((lesson: { name: string; id: string }) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ))}
          </select>
        </div>
        {errors.lessons?.message && (
          <p className="text-red-400">{errors.lessons?.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting
            ? "Submitting..."
            : title === "create"
              ? "Create"
              : "Update"}
        </button>
      </form>
    </div>
  );
}

export default SubjectForm;

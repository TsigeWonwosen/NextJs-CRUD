import { createClass, updateClass } from "@/app/actions/classAction";
import { ClassSchema, ClassSchemaType } from "@/app/libs/types";
import { capitalizeTitle } from "@/app/utils/capitalize";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function ClassForm({
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
  relatedData?: any;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClassSchemaType>({ resolver: zodResolver(ClassSchema) });

  const router = useRouter();

  const { teachers = [], lessons = [] } = relatedData;
  const onSubmit = async (data: any) => {
    try {
      if (title == "update") {
        await updateClass(data.id, data);
        toast.success("Class updated.");
      } else {
        await createClass(data);
        toast.success("Class created.");
      }
      router.refresh();
      reset();
      handleToggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[450px] h-max bg-slate-950 p-10 rounded-lg shadow-md flex flex-col items-center  relative z-10 ">
      <div
        className="absolute top-4 right-4 cursor-pointer z-70 w-3 h-3"
        onClick={() => handleToggle()}
      >
        <Image src="/close.png" alt="" width={14} height={14} />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center ">
        {capitalizeTitle(table) + " " + capitalizeTitle(title)}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 w-full bg-slate-950 h-auto z-50"
      >
        {title == "update" && (
          <input id="id" hidden {...register("id")} defaultValue={data.id} />
        )}
        <div className="mb-4">
          <label
            htmlFor="name"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={data?.name}
            {...register("name")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter your username"
            required
          />
        </div>

        {errors?.name && <p className="text-red-400">{errors.name?.message}</p>}
        <div className="mb-4">
          <label
            htmlFor="capacity"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Capacity
          </label>
          <input
            type="text"
            id="capacity"
            defaultValue={data?.capacity}
            {...register("capacity")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter capacity"
            required
          />
        </div>
        {errors?.capacity && (
          <p className="text-red-400">{errors.capacity?.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="supervisorId"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Supervisor
          </label>
          <select
            id="supervisorId"
            defaultValue={data?.supervisorId}
            {...register("supervisorId")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            {teachers &&
              teachers?.map(
                (teacher: { name: string; surname: string; id: string }) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )}
          </select>
        </div>
        {errors?.supervisorId && (
          <p className="text-red-400">{errors.supervisorId?.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="lessons"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Lossons
          </label>
          <select
            multiple
            id="lessons"
            defaultValue={data?.lessons.id}
            {...register("lessons")}
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          >
            {lessons &&
              lessons?.map((lesson: { name: string; id: number }) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.name}
                </option>
              ))}
          </select>
        </div>
        {errors?.supervisorId && (
          <p className="text-red-400">{errors.supervisorId?.message}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="gradeId"
            className=" text-left block text-sm font-medium text-gray-700"
          >
            Grade Id
          </label>
          <input
            type="text"
            id="grade"
            defaultValue={data?.gradeId}
            {...register("gradeId")}
            className="p-2 mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter capacity"
            required
          />
        </div>
        {errors?.capacity && (
          <p className="text-red-400">{errors.capacity?.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default ClassForm;

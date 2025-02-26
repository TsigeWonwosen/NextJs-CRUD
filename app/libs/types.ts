import {
  Announcement,
  Assignment,
  Class,
  Event,
  Grade,
  Lesson,
  Parent,
  Student,
  Subject,
  Teacher,
  Result,
  Exam,
  Attendance,
} from "@prisma/client";
import { z } from "zod";

export type StaffType = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
};

export const TeacherSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(4, { message: "Name should at least 4 charactor." })
    .regex(/^[A-Za-z]+$/, { message: "Name should only contain letters." }),
  surname: z
    .string()
    .min(4, { message: "Name should at least 4 charactor." })
    .regex(/^[A-Za-z]+$/, { message: "Surnam should only contain letters." }),
  username: z
    .string()
    .min(4, { message: "User Name should at least 4 charactor." }),
  email: z
    .string()
    .email({ message: "Invalid email addresss" })
    .min(4, { message: "User email should atleast 4 charactor.." })
    .optional(),
  img: z
    .union([
      z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Image is required")
        .refine(
          (files) => files[0]?.type.startsWith("image/"),
          "File must be an image",
        ),
      z.string().url(),
    ])
    .optional(),
  phone: z
    .string()
    .min(8, { message: "Phone number should atleast 8 digits." }),
  address: z
    .string()
    .min(4, { message: "Address should atleast 4 charactor." }),
  bloodType: z.string().min(1, { message: "Blood type required." }),
  sex: z.enum(["MALE", "FEMALE"]),
  classes: z.array(z.string().min(1, { message: "Class requierd" })),
  subjects: z.array(z.string()),
  lessons: z.array(z.string()),
  birthday: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
});

export type TeacherSchemaType = z.infer<typeof TeacherSchema>;

export const StudntSchema = z.object({
  name: z.string().min(4, { message: "User Name should atleast 4 charactor." }),
  email: z
    .string()
    .email({ message: "Invalid email addresss" })
    .min(4, { message: "User email should atleast 4 charactor.." }),
  photo: z
    .instanceof(File, { message: "Please upload a single file" })
    .optional(),
  phone: z
    .string()
    .min(8, { message: "Phone number should atleast 8 digits." }),
  subjects: z.enum(["Maths", "English", "Biology"], {
    message: "Subject is requiered.",
  }),
  classes: z.optional(z.string().min(4, { message: "Class requierd" })),
  address: z
    .string()
    .min(4, { message: "Address should atleast 4 charactor." }),
  birthday: z.date(),
});

export type StudentSchemaType = z.infer<typeof StudntSchema>;

export const ClassSchema = z.object({
  id: z.coerce.number().optional(),
  name: z
    .string()
    .min(1, { message: "Class name should be at least 4 charactor." }),
  capacity: z.coerce.number().min(1, { message: "Capacity is reqiured." }),
  supervisorId: z.string().optional(),
  gradeId: z.coerce.number().min(1, { message: "Grede is required." }),
  lessons: z.array(z.string()).optional(),
});
export type ClassSchemaType = z.infer<typeof ClassSchema>;

export const SubjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z
    .string()
    .min(4, { message: "Class name should be at least 4 charactor." }),
  teachers: z.array(z.string()).optional(),
  lessons: z.array(z.string()).optional(),
});

export type SubjectchemaType = z.infer<typeof SubjectSchema>;

export type UserProps = {
  id?: number;
  teacherId?: string;
  name: string;
  email: string;
  photo?: FileList | null;
  phone?: string;
  subjects?: string[];
  classes?: string[];
  address?: string;
};

export type pageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type StudentType = Student & { class: Class };

export type TeacherProps = Teacher & { classes: Class[] } & {
  subjects: Subject[];
  lessons: Lesson[];
};

export type ParentProps = Parent & { students: Student[] };

export type SubjectProps = Subject & { teachers: Teacher[]; lessons: Lesson[] };

export type ClassProps = Class & {
  superviser?: Teacher;
  grade: Grade;
  lessons: Lesson[];
  announcements: Announcement[];
  students: Student[];
  events: Event[];
};

export type AssignmentProps = Assignment & {
  lesson: Lesson;
  results: Result[];
};

export type AnnouncementList = Announcement & { class?: Class | null };

export type EventList = Event & { class: Class };

export type ExamList = Exam & { lesson: Lesson; results: Result[] };

export type ResultList = Result & {
  assignment: Assignment;
  student: Student;
  exam: Exam;
};

export type AttendanceList = Attendance & { student: Student; lesson: Lesson };

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
import { ObjectId } from "mongoose";
import { z } from "zod";

export type StaffType = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
};

type UserType = {
  id?: number;
  name: string;
  email: string;
};

type addStaffType = () => void;

export const TeacherSchema = z.object({
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

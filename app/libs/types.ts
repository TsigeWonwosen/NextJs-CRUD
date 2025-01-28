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

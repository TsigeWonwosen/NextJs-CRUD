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

import { fetchUsers } from "@/app/libs/fetchUsers";
import SideMenu from "../components/SideMenu";

export type User = {
  _id: string;
  name: string;
  email: string;
};
async function Users() {
  // let { users }: User | any = await fetchUsers();

  return (
    <>
      <SideMenu />
    </>
  );
}

export default Users;

import ListUsers from "@/app/components/ListUsers";
import { fetchUsers } from "@/app/libs/fetchUsers";

export type User = {
  _id: string;
  name: string;
  email: string;
};
async function Users() {
  let { users }: User | any = await fetchUsers();
  return (
    <div className="flex flex-col text-start >">
      {users.length &&
        users?.map((user: User) => <ListUsers key={user._id} {...user} />)}
    </div>
  );
}

export default Users;

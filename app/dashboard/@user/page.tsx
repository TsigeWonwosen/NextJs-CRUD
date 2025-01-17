import ListUsers from "@/app/components/ListUsers";
import { fetchUsers } from "@/app/libs/fetchUsers";
import { menuItems } from "@/app/utils/sideMenu";

export type User = {
  _id: string;
  name: string;
  email: string;
};
async function Users() {
  let { users }: User | any = await fetchUsers();

  const sideMenu = menuItems.map((menu) => (
    <ul key={menu.title} className="text-left">
      <h6 className="text-slate-500 font-medium ">{menu.title}</h6>
      {menu.items.map((item) => (
        <li
          key={item.label}
          className="px-2 text-left text-slate-400 rounded hover:bg-slate-300 cursor-pointer hover:text-slate-900"
        >
          {item.label}
        </li>
      ))}
    </ul>
  ));
  return <div className="flex flex-col text-start ">{sideMenu}</div>;
}

export default Users;

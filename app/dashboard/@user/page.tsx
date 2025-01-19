import ListUsers from "@/app/components/ListUsers";
import { fetchUsers } from "@/app/libs/fetchUsers";
import { menuItems } from "@/app/utils/sideMenu";
import Image from "next/image";

export type User = {
  _id: string;
  name: string;
  email: string;
};
async function Users() {
  let { users }: User | any = await fetchUsers();

  const sideMenu = menuItems.map((menu) => (
    <ul key={menu.title} className="text-left">
      <h6 className="text-slate-500 font-normal ">{menu.title}</h6>
      {menu.items.map((item) => (
        <li
          key={item.label}
          className="flex justify-left items-center flex-row px-4  py- 1 text-left text-slate-500 font-thin rounded hover:bg-slate-700 cursor-pointer hover:text-slate-900 gap-2"
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={12}
            height={12}
            className="bg-transparent object-cover overflow-hidden"
          />
          {item.label}
        </li>
      ))}
    </ul>
  ));
  return <div className="flex flex-col text-start ">{sideMenu}</div>;
}

export default Users;

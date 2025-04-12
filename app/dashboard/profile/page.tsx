import { getStaffs } from "@/app/libs/action";
import Staff from "../components/Staff";

async function Profile() {
  const users = await getStaffs();

  return <Staff users={users} />;
}

export default Profile;

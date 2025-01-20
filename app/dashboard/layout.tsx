import SideMenu from "./components/SideMenu";
import Card from "../components/Card";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full w-full ">
      <div className="flex justify-between items-start m-3  w-full p-4 gap-2">
        <div className=" basis-1/5  h-full">
          <Card>
            <SideMenu />
          </Card>
        </div>
        <div className="flex h-full w-full basis-3/5 ">{children}</div>
        <div className="basis-1/5 h-full  ">
          <Card>
            <h4>Left side Menu</h4>
          </Card>
        </div>
      </div>
    </section>
  );
}

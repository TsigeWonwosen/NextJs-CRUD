import SideMenu from "./components/SideMenu";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full w-full ">
      <div className="flex justify-between items-start w-full p-4 gap-4 md:gap-2">
        <div className=" flex-1/5  h-screen">
          <SideMenu />
        </div>
        <div className="flex-4/5 h-full w-full ">{children}</div>
      </div>
    </section>
  );
}

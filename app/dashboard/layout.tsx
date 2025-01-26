import SideMenu from "./components/SideMenu";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full w-full mb-3">
      <div className="flex justify-between items-start w-full h-full p-4 gap-4 md:gap-2">
        <div className=" w-[10%] sm:flex-1/5  h-full">
          <SideMenu />
        </div>
        <div className="w-[90%] sm:flex-4/5 h-full  ">{children}</div>
      </div>
    </section>
  );
}

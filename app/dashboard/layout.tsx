import SideMenu from "./components/SideMenu";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between items-start w-full h-full py-4 px-2  md:p-4 gap-2 md:gap-4">
      <div className="w-[18%] md:flex-1/5  h-screen">
        <SideMenu />
      </div>
      <div className="w-[82%] md:flex-4/5 h-full  ">{children}</div>
    </div>
  );
}

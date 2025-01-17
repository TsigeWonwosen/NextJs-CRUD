import Card from "../components/Card";

export default function DashBoardLayout({
  children,
  notification,
  user,
  revenue,
}: Readonly<{
  children: React.ReactNode;
  notification: React.ReactNode;
  user: React.ReactNode;
  revenue: React.ReactNode;
}>) {
  return (
    <section className="h-full">
      {children}
      <div className="flex justify-between items-center m-3 h-screen w-full p-4 gap-2">
        <div className=" basis-1/5  h-full">
          <Card>{user}</Card>
        </div>
        <div className="flex h-full basis-3/5  bg-red-600 ">
          <div className="w-3/4">
            <Card>{notification}</Card>
          </div>
          <span className="rotate-[270deg] h-12 w-1/4 ">
            {new Date().toString().slice(4, 16)}
          </span>
        </div>
        <div className="basis-1/5 h-full  ">
          <Card>{revenue}</Card>
        </div>
      </div>
    </section>
  );
}

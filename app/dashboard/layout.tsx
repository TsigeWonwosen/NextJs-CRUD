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
    <section className="h-full w-full ">
      {children}
      <div className="flex justify-between items-start m-3  w-full p-4 gap-2">
        <div className=" basis-1/5  h-full">
          <Card>{user}</Card>
        </div>
        <div className="flex h-full w-full basis-3/5 ">{notification}</div>
        <div className="basis-1/5 h-full  ">
          <Card>{revenue}</Card>
        </div>
      </div>
    </section>
  );
}

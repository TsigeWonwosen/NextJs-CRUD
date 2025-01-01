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
      <div className="flex justify-around text-left items-center mt-6 h-full w-full space-x-2 p-3">
        <div className=" w-1/2  h-full">
          <Card>{user}</Card>
        </div>
        <div className="flex justify-between flex-col w-1/2 h-full text-center items-center space-y-3 ">
          <div className="flex h-1/2  w-full ">
            <Card>{notification}</Card>
            <span className="rotate-[270deg] h-12  w-1/4 m-auto ">
              {" "}
              {new Date().toString().slice(4, 16)}
            </span>
          </div>
          <div className=" h-1/2  w-full ">
            <Card>{revenue}</Card>
          </div>
        </div>
      </div>
    </section>
  );
}

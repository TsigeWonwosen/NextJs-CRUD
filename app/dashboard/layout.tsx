export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-between flex-col  items-start w-full h-full py-4 px-2  md:p-4 gap-2 md:gap-4">
      {children}
    </div>
  );
}

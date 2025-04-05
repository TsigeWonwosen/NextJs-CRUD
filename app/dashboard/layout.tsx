export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-1 flex-col items-start justify-between px-2 py-4 md:gap-4 md:p-4 md:px-5">
      {children}
    </div>
  );
}

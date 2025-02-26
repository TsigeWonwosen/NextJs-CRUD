export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-between gap-2 px-2 py-4 md:gap-4 md:p-4">
      {children}
    </div>
  );
}

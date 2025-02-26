import { prisma } from "@/app/libs/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.map((event) => (
    <div
      className="w-full rounded-md border-2 border-t-2 p-5 odd:border-slate-900 even:border-slate-700"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-xs text-gray-300">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-400">{event.description}</p>
    </div>
  ));
};

export default EventList;

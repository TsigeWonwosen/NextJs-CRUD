import InfoCard from "./InfoCard";

function InfoCardsWrapper() {
  type cardType = "admin" | "student" | "parent" | "teacher";
  const cards: cardType[] = ["admin", "teacher", "student", "parent"];
  return (
    <div className="my-auto mt-4 grid w-full grid-cols-1 justify-items-center gap-x-3 gap-y-5 transition-all sm:grid-cols-2 md:mb-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
      {cards.map((card: cardType) => (
        <div className="w-full max-w-xs" key={card}>
          <InfoCard name={card} />
        </div>
      ))}
    </div>
  );
}

export default InfoCardsWrapper;

import Timer from "@/components/Timer";

interface Props {
  cardsLeft: number;
  round: number;
  timeLeft: number;
}

const GameHeader = ({ cardsLeft, round, timeLeft }: Props) => {
  return (
    <div className="w-full flex justify-between gap-2 items-center text-lg">
      <div>
        Cards Left:{" "}
        <span className="font-bold text-purple-500 text-xl">{cardsLeft}</span>
      </div>
      <Timer timer={timeLeft} />
      <div>
        Rounds:{" "}
        <span className="font-bold text-yellow-500 text-xl">{round}</span>
      </div>
    </div>
  );
};

export default GameHeader;

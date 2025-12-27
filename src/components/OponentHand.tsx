import calculateScore from "@/utils/calculateScore";
import type { CardProps } from "@/utils/cardDeck";
import { useMemo } from "react";

interface Props {
  opponentHand: CardProps[];
  isPlaying: boolean;
}

const OponentHand = ({ opponentHand, isPlaying }: Props) => {
  const score = useMemo(() => {
    return calculateScore(opponentHand);
  }, [opponentHand]);

  return (
    <div className="flex flex-col items-center gap-2">
      {isPlaying && (
        <div className="relative text-xs border p-1 px-2 bg-white rounded text-black mb-3">
          Is Playing...
          <span className="w-3 h-3 absolute -top-1 -right-1.5 ml-1 bg-green-500 px-1 rounded-full animate-ping"></span>
          <span className="w-3 h-3 absolute -top-1 -right-1.5 ml-1 bg-green-500 px-1 rounded-full"></span>
        </div>
      )}

      <div className="relative">
        <img
          className="w-14 h-14 rounded-full object-contain"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDnvOoER-RXErfBLLilVKgocKikA6RRjOXw&s"
        />

        <span className="absolute -top-1 -left-4 ml-1 bg-purple-400 px-1 rounded">
          {score}
        </span>
      </div>

      <div className="text-xs">Player 2</div>

      <div className="flex gap-2">
        {opponentHand.map((_, index) => (
          <button
            key={`oponent-card-${index}`}
            className="w-10 h-16 p-2.5 rounded flex flex-col justify-between bg-linear-to-bl from-card to-card-dark border border-card-dark"
          ></button>
        ))}
      </div>
    </div>
  );
};

export default OponentHand;

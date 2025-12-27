import type { CardProps } from "@/utils/cardDeck";
import { useMemo, useState } from "react";
import Card from "./Card";
import { isValidPlay } from "@/utils/gameRules";
import calculateScore from "@/utils/calculateScore";

interface Props {
  userHand: CardProps[];
  isPlaying: boolean;
  handleNextRound: (selectedCards?: CardProps[]) => void;
  topCardDiscarded: CardProps;
}

const UserHand = ({
  userHand,
  isPlaying,
  handleNextRound,
  topCardDiscarded,
}: Props) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    setSelectedCards((prev) => {
      const alreadyAdded = selectedCards.includes(index);

      if (alreadyAdded) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const score = useMemo(() => {
    return calculateScore(userHand);
  }, [userHand]);

  return (
    <div className="flex flex-col items-center gap-3">
      {isPlaying && (
        <div className="relative text-xs border p-1 px-2 bg-white rounded text-black mb-3">
          Your turn...
          <span className="w-3 h-3 absolute -top-1 -right-1.5 ml-1 bg-green-500 px-1 rounded-full animate-ping"></span>
          <span className="w-3 h-3 absolute -top-1 -right-1.5 ml-1 bg-green-500 px-1 rounded-full"></span>
        </div>
      )}

      <div className="relative">
        <img
          className="w-14 h-14 rounded-full object-contain"
          src="https://i.pinimg.com/736x/02/2b/bb/022bbb45b3257c3c494a1de93179bd8a.jpg"
        />

        <span className="absolute -top-1 -left-4 ml-1 bg-purple-400 px-1 rounded">
          {score}
        </span>
      </div>

      <div className="text-xs">Player 1</div>

      <div className="flex justify-center gap-3">
        {userHand.length ? (
          userHand.map((card, index) => {
            const isValid = isValidPlay(card, topCardDiscarded);

            return (
              <Card
                key={`card-${card.type}-${card.value}-${index}`}
                onClick={() => handleCardClick(index)}
                type={card.type}
                value={card.value}
                isSelected={selectedCards.includes(index)}
                isDisabled={!isPlaying || !isValid}
              />
            );
          })
        ) : (
          <div className="w-22 h-34 p-2.5 rounded bg-surface border border-glow border-dashed" />
        )}
      </div>

      <div className="flex p-4 flex justify-center gap-2">
        <button
          className="bg-blue-500 p-1.5 px-8 rounded-md text-white font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => {
            handleNextRound(selectedCards.map((i) => userHand[i]));
            setSelectedCards([]);
          }}
          disabled={!isPlaying || selectedCards.length === 0}
        >
          Next Round
        </button>
      </div>
    </div>
  );
};

export default UserHand;

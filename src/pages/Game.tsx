import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Timer from "@/components/Timer";
import Plus from "@/icons/Plus";

type Card = {
  type: string;
  value: string;
};

const Game = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [discardPile, setDiscardPile] = useState<Card[]>([
    {
      type: "DIAMOND",
      value: "1",
    },
  ]);
  const [userHand, setHand] = useState<Card[]>([
    {
      type: "HEART",
      value: "1",
    },
    {
      type: "DIAMOND",
      value: "K",
    },
  ]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  const timer = 180;

  useEffect(() => {}, []);

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

  const onDrawCard = () => {};

  return (
    <div className=" flex flex-col items-center p-8">
      <div className="h-200 flex flex-col justify-between items-center text-white">
        <div className="flex gap-10 items-center text-lg">
          <div>
            Round:{" "}
            <span className="font-bold text-purple-500 text-xl">{score}</span>
          </div>
          <Timer timer={timer} />
          <div>
            Score:{" "}
            <span className="font-bold text-yellow-500 text-xl">{score}</span>
          </div>
        </div>

        <div className="flex gap-8">
          <button
            onClick={onDrawCard}
            className="w-22 h-34 p-2.5 rounded bg-deck-card flex items-center justify-center"
          >
            <Plus />
          </button>

          {discardPile.length > 0 ? (
            <Card
              type={discardPile[0].type}
              value={discardPile[0].value}
              isDisabled
            />
          ) : (
            <div className="w-22 h-34 p-2.5 rounded bg-surface border border-glow border-dashed" />
          )}
        </div>

        <div>
          <div className="flex justify-center gap-3">
            {userHand.length ? (
              userHand.map((card, index) => (
                <Card
                  key={`card-${card.type}-${card.value}-${index}`}
                  onClick={() => handleCardClick(index)}
                  type={card.type}
                  value={card.value}
                  isSelected={selectedCards.includes(index)}
                />
              ))
            ) : (
              <div className="w-22 h-34 p-2.5 rounded bg-surface border border-glow border-dashed" />
            )}
          </div>

          <div className="flex p-4 flex justify-center gap-2">
            <button
              className="bg-blue-500 p-2 px-10 rounded-md text-white font-bold"
              onClick={() => {}}
            >
              Play cards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

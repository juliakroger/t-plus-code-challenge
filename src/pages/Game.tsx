import { useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import Timer from "@/components/Timer";
import Plus from "@/icons/Plus";
import { useMachine } from "@xstate/react";
import { gameMachine } from "@/state/gameMachine";

interface Props {
  onGameEnd: (score: number) => void;
}

const Game = ({ onGameEnd }: Props) => {
  const [state, send] = useMachine(gameMachine);
  const { timeLeft, userHand, opponentHand, deck, discardPile } = state.context;

  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const score = useMemo(() => {
    const totalPoints = userHand.reduce((sum, card) => sum + card.points, 0);
    return totalPoints || 0;
  }, [userHand]);

  useEffect(() => {
    send({ type: "START" });
  }, [send]);

  useEffect(() => {
    if (state.matches("ready")) {
      const interval = setInterval(() => {
        send({ type: "TICK" });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state, send]);

  useEffect(() => {
    if (timeLeft <= 0) onGameEnd(score);
  }, [timeLeft, onGameEnd]);

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

  const onDrawCard = () => {
    if (!deck.length) return;
  };

  const onPlayCards = () => {};

  return (
    <div className="h-[90%] min-w-[600px] text-white">
      <div className="w-full flex justify-between gap-2 items-center text-lg">
        <div>
          Cards Left:{" "}
          <span className="font-bold text-purple-500 text-xl">
            {deck.length}
          </span>
        </div>
        <Timer timer={timeLeft} />
        <div>
          Current Hand:{" "}
          <span className="font-bold text-yellow-500 text-xl">{score}</span>
        </div>
      </div>

      <div className="h-full w-full flex flex-col justify-between items-center mt-10">
        <div className="flex flex-col items-center gap-2">
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

        <div className="flex gap-8">
          <button
            onClick={onDrawCard}
            disabled={!deck.length}
            className="w-22 h-34 p-2.5 rounded bg-deck-card flex items-center justify-center disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
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
          <div className="text-xs text-center mb-2">Player 1</div>

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
              className="bg-blue-500 p-2 px-10 rounded-md text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={onPlayCards}
              disabled={selectedCards.length === 0}
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

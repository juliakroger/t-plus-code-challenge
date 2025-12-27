import { useEffect } from "react";
import Card from "@/components/Card";
import Plus from "@/icons/Plus";
import { useMachine } from "@xstate/react";
import { gameMachine } from "@/state/gameMachine";
import GameHeader from "@/components/GameHeader";
import OponentHand from "@/components/OponentHand";
import UserHand from "@/components/UserHand";
import type { CardProps } from "@/utils/cardDeck";
import calculateScore from "@/utils/calculateScore";

interface Props {
  onGameEnd: (userScore: number, opponentScore: number) => void;
}

const Game = ({ onGameEnd }: Props) => {
  const [state, send] = useMachine(gameMachine);
  const {
    currentPlayer,
    round,
    timeLeft,
    userHand,
    opponentHand,
    deck,
    discardPile,
  } = state.context;

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
    if (timeLeft <= 0) {
      const userPoints = calculateScore(userHand);
      const opponentPoints = calculateScore(opponentHand);

      onGameEnd(userPoints, opponentPoints);
    }
    // TODO: open a modal with score if user won or not
  }, [timeLeft, onGameEnd]);

  const onDrawCard = () => {
    // if (currentPlayer !== "user" || deck.length === 0) return;
    send({ type: "USER_DRAW" });
  };

  const handleNextRound = (cards?: CardProps[]) => {
    send({ type: "USER_PLAY", cards });
  };

  return (
    <div className="h-[90%] min-w-[600px] text-white">
      <GameHeader cardsLeft={deck.length} round={round} timeLeft={timeLeft} />

      <div className="h-full w-full flex flex-col justify-between items-center mt-10">
        <OponentHand
          opponentHand={opponentHand}
          isPlaying={currentPlayer === "opponent"}
        />

        <div className="flex gap-8">
          <button
            onClick={onDrawCard}
            disabled={currentPlayer !== "user" || !deck.length}
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

        <UserHand
          userHand={userHand}
          isPlaying={currentPlayer === "user"}
          handleNextRound={handleNextRound}
          topCardDiscarded={discardPile[0]}
        />
      </div>
    </div>
  );
};

export default Game;

import { useState } from "react";
import Game from "@/pages/Game";

const Home = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className=" flex flex-col items-center p-8">
      {gameStarted ? (
        <Game />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded text-white bg-surface border border-glow">
            <div className="text-center text-lg font-bold mb-4">Game Rules</div>

            <div>
              Achieve the lowest total hand value or dispose of all your cards
              before the 3-minute round timer expires.
            </div>

            <div className="mt-4 font-bold">Scoring System</div>
            <ul className="list-disc px-6">
              <li>Ace = 1 point</li>
              <li>Number cards (2-10) = Face value</li>
              <li>Jack = 11 points</li>
              <li>Queen = 12 points</li>
              <li>King = 13 points</li>
            </ul>
          </div>

          <button
            className="bg-blue-500 p-2 px-10 rounded-md text-white font-bold cursor-pointer"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

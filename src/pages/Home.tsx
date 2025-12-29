import { useEffect, useState } from "react";
import Game from "@/pages/Game";

const Home = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const handleGameEnd = (userScore: number, opponentScore: number) => {
    setGameStarted(false);

    const gameResult = {
      userScore,
      opponentScore,
      date: new Date().toISOString(),
    };

    const previousResults = JSON.parse(
      localStorage.getItem("gameResults") || "[]"
    );

    const updatedResults = [...previousResults, gameResult];

    setGameResults(updatedResults);
    localStorage.setItem("gameResults", JSON.stringify(updatedResults));
  };

  useEffect(() => {
    const storedResults = JSON.parse(
      localStorage.getItem("gameResults") || "[]"
    );
    setGameResults(storedResults);
  }, []);

  return (
    <div className="h-lvh flex flex-col items-center p-8">
      {gameStarted ? (
        <Game onGameEnd={handleGameEnd} />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded text-white bg-surface border border-glow">
            <div className="text-center text-lg font-bold mb-4">Game Rules</div>
            <div>
              Achieve the lowest total hand value or dispose of all your cards
              before the 3-minute round timer expires.
            </div>
            <div className="mt-4 font-bold">Valid Cards</div>
            <div>
              Have the same value as top discard card (7 on 7, Queen on Queen)
            </div>
            <div>
              Are in ascending sequence (8 on 7, Jack on 10, Ace on King)
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

          {gameResults.length > 0 && (
            <div className="mt-6 p-4 bg-surface border border-glow rounded">
              <h2 className="font-bold mb-6 text-white">Past Game Results</h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-white border-b border-panel">
                    <th className="p-2"></th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {gameResults.map((result, index) => (
                    <tr key={index} className="text-white">
                      <td className="p-2">
                        {result.userScore < result.opponentScore ? (
                          <span className="text-green-500 font-bold">WON</span>
                        ) : (
                          <span className="text-red-500">LOST</span>
                        )}
                      </td>

                      <td className="p-2">
                        {new Date(result.date).toLocaleString()}
                      </td>
                      <td className="p-2">
                        {result.userScore} v. {result.opponentScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

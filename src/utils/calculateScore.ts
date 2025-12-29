import type { CardProps } from "./cardDeck";

const calculateScore = (cards?: CardProps[]) => {
  const totalPoints = cards?.reduce((sum, card) => sum + card?.points, 0);
  return totalPoints || 0;
};

export default calculateScore;

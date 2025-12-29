import type { CardProps } from "@/utils/cardDeck";

export const isValidPlay = (card: CardProps, topCard: CardProps) => {
  return (
    card?.points === topCard?.points || card?.points === topCard?.points + 1
  );
};

export const getValidCards = (hand: CardProps[], topCard: CardProps) => {
  return hand.filter((card) => isValidPlay(card, topCard));
};

export const getValidCardsIndexes = (hand: CardProps[], topCard: CardProps) => {
  return hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => isValidPlay(card, topCard))
    .map(({ index }) => index);
};

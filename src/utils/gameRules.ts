import type { CardProps } from "@/utils/cardDeck";

export function isValidPlay(card: CardProps, topCard: CardProps): boolean {
  return card.points === topCard.points || card.points === topCard.points + 1;
}

export function getValidCards(
  hand: CardProps[],
  topCard: CardProps
): CardProps[] {
  return hand.filter((card) => isValidPlay(card, topCard));
}

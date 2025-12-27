import type { CardProps } from "@/utils/cardDeck";

export function isValidPlay(card: CardProps, topCard: CardProps): boolean {
  return card.value === topCard.value || card.points + 1 === topCard.points;
}

export function getValidCards(
  hand: CardProps[],
  topCard: CardProps
): CardProps[] {
  return hand.filter((card) => isValidPlay(card, topCard));
}

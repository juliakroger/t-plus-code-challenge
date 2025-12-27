import { createMachine, assign } from "xstate";
import { generateDeck, type CardProps } from "@/utils/cardDeck";

export interface Player {
  id: string;
  hand: CardProps[];
}

export interface GameContext {
  userHand: CardProps[];
  opponentHand: CardProps[];
  deck: CardProps[];
  discardPile: CardProps[];
  timeLeft: number;
  currentPlayer: "user" | "opponent";
  round: number;
  userDrawThisRound: boolean;
}

export type GameEvent =
  | { type: "START" }
  | { type: "TICK" }
  | { type: "TIME_UP" }
  | { type: "USER_PLAY"; cards?: CardProps[] }
  | { type: "USER_DRAW" };

const INITIAL_DRAW_AMOUNT = 5;
// const ROUND_TIME_SECONDS = 180;
const ROUND_TIME_SECONDS = 3600;

export const gameMachine = createMachine<GameContext, GameEvent>(
  {
    id: "game",
    initial: "idle",
    context: {
      userHand: [],
      opponentHand: [],
      deck: [],
      discardPile: [],
      timeLeft: ROUND_TIME_SECONDS,
      currentPlayer: "user",
      round: 1,
      userDrawThisRound: false,
    },
    states: {
      idle: {
        on: {
          START: {
            target: "ready",
            actions: "setupGame",
          },
        },
      },
      ready: {
        on: {
          TICK: [
            {
              actions: "decrementTimer",
            },
          ],
          USER_DRAW: {
            actions: "userDrawCard",
          },
          USER_PLAY: {
            actions: "userPlayCards",
          },
        },
      },
    },
  },
  {
    actions: {
      setupGame: assign(({ context }) => {
        const deck = generateDeck();
        const userHand: CardProps[] = [];
        const opponentHand: CardProps[] = [];

        let index = 0;

        for (let i = 0; i < INITIAL_DRAW_AMOUNT; i++) {
          userHand.push(deck[index++]);
          opponentHand.push(deck[index++]);
        }

        const discardPile = [deck[index++]];
        const remainingDeck = deck.slice(index);

        return {
          ...context,
          userHand,
          opponentHand,
          deck: remainingDeck,
          discardPile,
        };
      }),
      decrementTimer: assign({
        timeLeft: ({ context }) => context.timeLeft - 1,
      }),
      userDrawCard: assign(({ context }) => {
        console.log("DRAWING CARD", context);
        if (!context.deck.length) return {};

        const [card, ...rest] = context.deck;

        return {
          deck: rest,
          userHand: [...context.userHand, card],
          userDrawThisRound: true,
        };
      }),
      userPlayCards: assign(({ context, event }) => {
        if (!event.cards) {
          return {
            round: context.round + 1,
            currentPlayer: "opponent",
          };
        }

        const updatedUserHand = context.userHand.filter(
          (userCard) =>
            !event.cards?.some(
              (selectedCard) =>
                userCard.type === selectedCard.type &&
                userCard.value === selectedCard.value
            )
        );

        return {
          round: context.round + 1,
          currentPlayer: "opponent",
          userHand: updatedUserHand,
          discardPile: [...event.cards, ...context.discardPile],
        };
      }),
    },
  }
);

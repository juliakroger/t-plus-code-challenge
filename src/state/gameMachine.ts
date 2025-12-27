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
}

export type GameEvent =
  | { type: "START" }
  | { type: "TICK" }
  | { type: "TIME_UP" };

const INITIAL_DRAW_AMOUNT = 5;
const ROUND_TIME_SECONDS = 180;

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
        },
      },
    },
  },
  {
    actions: {
      setupGame: assign(() => {
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
          userHand,
          opponentHand,
          deck: remainingDeck,
          discardPile,
          timeLeft: ROUND_TIME_SECONDS,
        };
      }),
      decrementTimer: assign({
        timeLeft: ({ context }) => context.timeLeft - 1,
      }),
    },
  }
);

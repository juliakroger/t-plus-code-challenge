import { createMachine, assign } from "xstate";
import { generateDeck, type CardProps } from "@/utils/cardDeck";
import { getValidCards } from "@/utils/gameRules";

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
}

type GameEventTypes = "START" | "TICK" | "USER_PLAY" | "USER_DRAW";

export type GameEvent = { type: GameEventTypes; cards?: CardProps[] };

const INITIAL_DRAW_AMOUNT = 5;
const ROUND_TIME_SECONDS = 180;

export const gameMachine = createMachine(
  {
    types: {} as {
      context: GameContext;
      events: GameEvent;
    },
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
          TICK: { actions: "decrementTimer" },
          USER_DRAW: {
            target: "opponentTurn",
            actions: "userDrawCard",
          },
          USER_PLAY: {
            target: "opponentTurn",
            actions: "userPlayCards",
          },
        },
      },
      opponentTurn: {
        entry: "opponentPlay",
        after: {
          2000: {
            target: "ready",
            actions: "endOpponentTurn",
          },
        },
      },
    },
  },
  {
    actions: {
      setupGame: assign(({ context }) => {
        console.log("SETUP GAME");
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
        if (!context.deck.length) return {};

        const [card, ...rest] = context.deck;

        console.log("USER DRAW CARD", card);

        return {
          round: context.round + 1,
          currentPlayer: "opponent",
          deck: rest,
          userHand: [...context.userHand, card],
        };
      }),
      userPlayCards: assign(({ context, event }) => {
        console.log("USER PLAY CARD", event.cards);

        if (!event.cards || event.cards.length === 0) {
          if (!context.deck.length) {
            return {
              round: context.round + 1,
              currentPlayer: "opponent",
            };
          }

          const [card, ...rest] = context.deck;
          console.log("USER AUTO-DRAW CARD", card);

          return {
            round: context.round + 1,
            currentPlayer: "opponent",
            deck: rest,
            userHand: [...context.userHand, card],
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
      opponentPlay: assign(({ context }) => {
        const topCard = context.discardPile[0];
        const validCards = getValidCards(context.opponentHand, topCard);

        if (validCards.length) {
          console.log("OPPONENT PLAY CARD", validCards);

          const updatedOponentHand = context.opponentHand.filter(
            (userCard) =>
              !validCards.some(
                (selectedCard) =>
                  userCard.type === selectedCard.type &&
                  userCard.value === selectedCard.value
              )
          );

          return {
            opponentHand: updatedOponentHand,
            discardPile: [...validCards, ...context.discardPile],
          };
        } else {
          const [card, ...rest] = context.deck;

          console.log("OPPONENT DRAW CARD", card);

          return {
            opponentHand: [...context.opponentHand, card],
            deck: rest,
          };
        }
      }),
      endOpponentTurn: assign(({ context }) => ({
        currentPlayer: "user",
        round: context.round + 1,
      })),
    },
  }
);

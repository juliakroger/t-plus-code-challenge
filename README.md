# Project

## Deployed at
https://t-plus-code-challenge.netlify.app/

## Overview

You are designing the state machine architecture for a turn based card game system.

## Game Mechanics

Achieve the lowest total hand value or dispose of all your cards before the 3-minute round timer expires.

### Scoring System

- Ace = 1 point
- Number cards (2-10) = Face value
- Jack = 11 points
- Queen = 12 points
- King = 13 points

### Turn-based Play

Players alternate placing cards on shared discard pile. You can only play cards that:

- **Have the same value as top discard card (7 on 7, Queen on Queen)**
- **Are in ascending sequence (8 on 7, Jack on 10, Ace on King)**

_If you cannnot play a match you have to take another from the deck_, **multiple matches can be played at once**.

### Controls

Single Card Play: Auto-play when only one valid card exists or have to pick up from the deck.
Multiple Card Selection: When multiple valid cards are available:

- Click cards to select/deselect them
- SPACE key to play all selected cards as together

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Yarn](https://yarnpkg.com/) installed

## How to Run

```bash
yarn
yarn dev
```

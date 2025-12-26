import Club from "@/icons/Club";
import Diamond from "@/icons/Diamond";
import Heart from "@/icons/Heart";
import Spade from "@/icons/Spade";
import { CARD_TYPES } from "@/utils/cardDeck";

interface Props {
  type: string;
}

const CardSymbolIcon = ({ type }: Props) => {
  switch (type) {
    case CARD_TYPES.HEART:
      return <Heart />;

    case CARD_TYPES.DIAMOND:
      return <Diamond />;

    case CARD_TYPES.CLUB:
      return <Club />;

    case CARD_TYPES.SPADE:
      return <Spade />;

    default:
      return <div></div>;
  }
};

export default CardSymbolIcon;

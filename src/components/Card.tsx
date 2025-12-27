import cn from "@/utils/classnames";
import CardSymbolIcon from "./CardSymbolIcon";

interface Props {
  type: string;
  value: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const Card = ({
  type,
  value,
  isSelected = false,
  isDisabled = false,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "w-22 h-34 p-2.5 rounded flex flex-col justify-between",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        !isSelected && !isDisabled
          ? "hover:scale-110 transition transition-transform"
          : "",
        isSelected
          ? "bg-linear-to-bl from-card-selected to-card-selected-dark border border-card-selected-dark scale-105"
          : "bg-linear-to-bl from-card to-card-dark border border-card-dark",
        "disabled:opacity-70"
      )}
    >
      <CardSymbolIcon type={type} />
      <div className="text-end text-3xl font-bold text-card-face">{value}</div>
    </button>
  );
};

export default Card;

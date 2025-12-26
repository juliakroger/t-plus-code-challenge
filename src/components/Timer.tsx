const Timer = ({ timer = 0 }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="text-2xl font-bold bg-[#4B6B97] p-1 px-3 rounded">
      {formatTime(timer)}
    </div>
  );
};

export default Timer;

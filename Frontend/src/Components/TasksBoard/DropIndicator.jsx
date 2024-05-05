const DropIndicator = ({ active }) => {
  return (
    <div
      className={`my-0.5 h-0.5 w-full bg-violet-400 -mt-2 ${active ? "opacity-1" : "opacity-0"} `}
    ></div>
  );
};

export default DropIndicator;

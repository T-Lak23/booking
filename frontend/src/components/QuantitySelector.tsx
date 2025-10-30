import { useBookingStore } from "../store/useBookingStore";

const QuantitySelector = ({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (val: number) => void;
  max: number;
}) => {
  const { bookingData } = useBookingStore();
  const isInactive = !bookingData.date || !bookingData.time;

  return (
    <div className="flex items-center gap-2 opacity-100 transition-opacity duration-200">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1 || isInactive}
        className="px-2 py-1 bg-gray-200 rounded disabled:bg-disabled disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className={isInactive ? "text-gray-400" : ""}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max || isInactive}
        className="px-2 py-1 bg-gray-200 rounded disabled:bg-disabled disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

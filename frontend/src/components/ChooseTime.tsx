import { useBookingStore } from "../store/useBookingStore";
import type { Experience } from "../types/experiencesType";
import DateAndTimeButton from "./DateAndTimeButton";

const ChooseTime = ({
  selectedExperience,
}: {
  selectedExperience: Experience | undefined;
}) => {
  const { bookingData, setBookingData } = useBookingStore();
  if (!selectedExperience) return null;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18px] font-medium">Choose Date</p>
      <div className="flex gap-4">
        {selectedExperience.availableSlots.map((slot) => (
          <DateAndTimeButton
            key={slot._id}
            text={slot.time}
            left={slot.totalSeats - slot.bookedSeats}
            isActive={slot.time === bookingData.time}
            onClick={() => setBookingData({ time: slot.time })}
          />
        ))}
      </div>
      <p className="text-muted text-[12px]">All times are in IST (GMT +5:30)</p>
    </div>
  );
};

export default ChooseTime;

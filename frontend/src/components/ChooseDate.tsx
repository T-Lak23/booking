import type { Experience } from "../types/experiencesType";
import DateAndTimeButton from "./DateAndTimeButton";
import { useBookingStore } from "../store/useBookingStore";

const ChooseDate = ({
  selectedExperience,
}: {
  selectedExperience: Experience | undefined;
}) => {
  const { setBookingData, bookingData } = useBookingStore();

  if (!selectedExperience) return null;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18px] font-medium">Choose Date</p>
      <div className="flex gap-4">
        {selectedExperience.availableSlots.map((slot) => (
          <DateAndTimeButton
            key={slot._id}
            text={slot.date}
            isActive={slot.date === bookingData.date}
            onClick={() => setBookingData({ date: slot.date })}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseDate;

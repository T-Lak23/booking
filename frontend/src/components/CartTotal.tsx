import { useEffect, useState } from "react";
import { useBookingStore } from "../store/useBookingStore";
import type { Experience } from "../types/experiencesType";
import Button from "./Button";
import QuantitySelector from "./QuantitySelector";
import { useNavigate } from "react-router";

const CartTotal = ({
  selectedExperience,
}: {
  selectedExperience: Experience | undefined;
}) => {
  const { bookingData, setBookingData } = useBookingStore();
  const [tax, _] = useState<number>(59);
  const isDisabled = () => {
    return selectedExperience?.availableSlots.every(
      (slot) => slot.totalSeats - slot.bookedSeats === 0
    );
  };
  const selectedSlot = selectedExperience?.availableSlots.find(
    (slot) => slot.date === bookingData?.date && slot.time === bookingData?.time
  );

  const maxSeats = selectedSlot
    ? selectedSlot.totalSeats - selectedSlot.bookedSeats
    : 10;

  useEffect(() => {
    setBookingData({
      totalAmount: selectedExperience?.price! * bookingData.seatsBooked + tax,
    });
  }, [bookingData.seatsBooked]);
  const navigate = useNavigate();

  if (!selectedExperience) return null;
  return (
    <div className="bg-cart rounded-xl p-6 flex flex-col gap-4 ">
      <div className="flex flex-col gap-4  border-b border-border pb-4">
        <div className="flex justify-between">
          <p className="text-cart-text">Starts at</p>{" "}
          <p className="text-lg">₹{selectedExperience.price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text">Quantity</p>{" "}
          <QuantitySelector
            onChange={(val) => setBookingData({ seatsBooked: val })}
            value={bookingData.seatsBooked}
            max={maxSeats ?? 0}
          />
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text">Subtotal</p>{" "}
          <p className="text-[14px]">
            {selectedExperience.price * bookingData.seatsBooked}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text ">Taxes</p>{" "}
          <p className="text-[14px]">{tax}</p>
        </div>
      </div>
      <div className="text-xl flex justify-between font-medium">
        <p>Total</p>
        <p>₹{selectedExperience.price * bookingData.seatsBooked + tax}</p>
      </div>
      <div>
        <Button
          text="Confirm"
          className="bg-button py-3 px-5 rounded-lg w-full disabled:bg-disabled-cart-button disabled:text-muted"
          disabled={isDisabled}
          onClick={() => navigate(`/${selectedExperience._id}/checkout`)}
        />
      </div>
    </div>
  );
};

export default CartTotal;

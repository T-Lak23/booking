import { useEffect, useState } from "react";
import { useBookingStore } from "../store/useBookingStore";
import type { Experience } from "../types/experiencesType";
import Button from "./Button";
import QuantitySelector from "./QuantitySelector";
import { useNavigate } from "react-router";
import useBooking from "../hooks/useBooking";

const FinalBreakdown = ({
  selectedExperience,
  discounted,
}: {
  selectedExperience: Experience | undefined;
  discounted: { message: string; discount: number; finalAmount: number };
}) => {
  const { bookingData, setBookingData } = useBookingStore();
  const { handleSubmit, bookingError } = useBooking({ data: bookingData });
  const [tax, setTax] = useState<number>(59);
  const isDisabled = () => {
    return selectedExperience?.availableSlots.every(
      (slot) => slot.totalSeats - slot.bookedSeats === 0
    );
  };
  useEffect(() => {
    setBookingData({
      finalAmount: discounted
        ? discounted.finalAmount + tax
        : selectedExperience?.price! * bookingData.seatsBooked + tax,
    });
  }, [bookingData.finalAmount]);
  useEffect(() => {
    setBookingData({ id: selectedExperience?._id });
  }, []);
  const navigate = useNavigate();

  const handleBooking = async () => {
    const bookingId = await handleSubmit();
    console.log("id", bookingId);

    if (bookingId) {
      navigate(`/${selectedExperience?._id}/confirmation`, {
        state: { bookingId },
      });
    }
  };

  if (!selectedExperience) return null;
  return (
    <div className="bg-cart rounded-xl p-6 flex flex-col gap-4 ">
      <div className="flex flex-col gap-4  border-b border-border pb-4">
        <div className="flex justify-between">
          <p className="text-cart-text">Experience</p>{" "}
          <p className="md:text-lg text-[14px]">{selectedExperience.title}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text">Date</p>{" "}
          <p className="text-lg">{bookingData.date}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text">Time</p>{" "}
          <p className="text-lg">{bookingData.time}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text">Qty</p>{" "}
          <p className="text-[14px] text-active">{bookingData.seatsBooked}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-cart-text">Subtotal</p>{" "}
          <p className="text-[16px]">
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
        <p>
          ₹
          {discounted
            ? discounted.finalAmount + tax
            : selectedExperience.price * bookingData.seatsBooked + tax}
        </p>
      </div>
      <div>
        <Button
          text="Pay and Confirm"
          className="bg-button py-3 px-5 rounded-lg w-full disabled:bg-disabled-cart-button disabled:text-muted"
          disabled={isDisabled}
          onClick={handleBooking}
        />
        {bookingError && (
          <p className="text-alert text-[14px]">{bookingError}</p>
        )}
      </div>
    </div>
  );
};

export default FinalBreakdown;

import { useState } from "react";
import { API } from "../config/api";
import { useBookingStore, type BookingData } from "../store/useBookingStore";
import toast from "react-hot-toast";

const useBooking = ({ data }: { data?: BookingData }) => {
  const [bookingError, setBookingError] = useState<any>(null);
  const { clearBookingData } = useBookingStore();

  const handleSubmit = async () => {
    if (!data?.email.trim() || !data.name.trim())
      throw new Error("Name and email are required");

    try {
      const response = await API.post("/experiences/booking", data);
      clearBookingData();
      toast.success(response.data.message || "Booking completed");
      console.log(response.data);
      localStorage.setItem(
        "bookingId",
        response.data?.booking?.bookingId || ""
      );

      console.log(response.data.booking);
      return response.data?.booking?.bookingId || "";
    } catch (error: any) {
      console.log("booking", error);
      setBookingError(error.response.data.message);
    }
  };
  return { handleSubmit, bookingError };
};

export default useBooking;

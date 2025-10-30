import { createContext, useContext, useState, useEffect } from "react";

export type BookingData = {
  id?: string;
  name: string;
  email: string;
  seatsBooked: number;
  date: string;
  time: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  promoCode: string;
};

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: (data: Partial<BookingData>) => void;
  clearBookingData: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingData, setBookingDataState] = useState<BookingData>(() => {
    const saved = sessionStorage.getItem("bookingData");
    return saved
      ? JSON.parse(saved)
      : {
          id: "",
          name: "",
          email: "",
          seatsBooked: 0,
          date: "",
          time: "",
          totalAmount: 0,
          discount: 0,
          finalAmount: 0,
          promoCode: "",
        };
  });

  const setBookingData = (data: Partial<BookingData>) => {
    setBookingDataState((prev) => ({ ...prev, ...data }));
  };

  const clearBookingData = () => {
    setBookingDataState({
      id: "",
      name: "",
      email: "",
      seatsBooked: 1,
      date: "",
      time: "",
      totalAmount: 0,
      discount: 0,
      finalAmount: 0,
      promoCode: "",
    });
    sessionStorage.removeItem("bookingData");
  };

  useEffect(() => {
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, clearBookingData }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingStore = () => {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error("useBookingStore must be used inside BookingProvider");
  return ctx;
};

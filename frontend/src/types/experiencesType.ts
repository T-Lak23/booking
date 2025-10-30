export type Experience = {
  _id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  image: string;
  availableSlots: Slot[];
  __v: number;
};

export type Slot = {
  _id: string;
  date: string;
  time: string;
  totalSeats: number;
  bookedSeats: number;
};

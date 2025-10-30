import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router";

const Confirmation = () => {
  const [bookingId, setBookingId] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fromState = location.state?.bookingId;
    const saved = localStorage.getItem("bookingId");
    setBookingId(fromState || saved || "");
  }, [location.state]);
  return (
    <Layout>
      <div className="md:py-[167px] py-[220px] flex items-center flex-col gap-5 ">
        <img src="/Vector.png" alt="tick" className="w-[70px] h-[70px]" />

        <p className="text-[32px] font-medium">Booking Confirmed</p>
        <p className="text-cart-text text-xl">
          REF ID: {bookingId ? bookingId?.toUpperCase() : "N/A"}
        </p>
        <Button
          text="Back to Home"
          className="py-2 px-4 rounded-sm bg-muted-2"
          onClick={() => {
            navigate("/");
            localStorage.removeItem("bookingId");
          }}
        />
      </div>
    </Layout>
  );
};

export default Confirmation;

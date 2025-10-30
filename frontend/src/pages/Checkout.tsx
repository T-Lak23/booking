import { useEffect, useState } from "react";
import Button from "../components/Button";
import GoBack from "../components/GoBack";
import Layout from "../components/Layout";
import usePromo from "../hooks/usePromo";
import { useBookingStore } from "../store/useBookingStore";
import { useExperienceStore } from "../store/useExperienceStore";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import FinalBreakdown from "../components/FinalBreakdown";

const Checkout = () => {
  const { selectedExperience, getOneExperience } = useExperienceStore();
  const { bookingData, setBookingData } = useBookingStore();
  const { validateCoupon } = usePromo();
  const [error, setError] = useState<any>(null);
  const [_, setLoading] = useState<boolean>(false);
  const [discounted, setDiscounted] = useState();
  const [code, setCode] = useState<string>();
  const { id } = useParams();

  const validate = async () => {
    setLoading(true);
    try {
      const result = await validateCoupon(code!, bookingData.totalAmount);
      setDiscounted(result);
      setCode(bookingData.promoCode);
      setBookingData({ discount: result.discount, promoCode: code });

      toast.success(result.message);
      setCode("");
      console.log(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOneExperience(id!);
  }, []);
  if (!selectedExperience) return null;
  return (
    <Layout>
      <div className="lg:px-[124px] lg:py-[155px] px-4 sm:py-[190px] py-[230px] mx-auto">
        <GoBack to={`/${selectedExperience._id}`} text="Checkout" />
        <div className="flex flex-col lg:flex-row  gap-4">
          <div className=" bg-cart py-5 px-6 flex-1 flex flex-col gap-4">
            <div className="flex md:flex-row flex-col gap-6 items-center">
              <div className="flex-1 w-full flex flex-col gap-2">
                <label htmlFor="name" className="text-label text-[14px]">
                  Full name
                </label>
                <input
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ name: e.target.value })}
                  type="text"
                  id="name"
                  className="bg-input py-3 px-4 rounded-md w-full text-[14px] placeholder:text-placeholder focus:outline-0"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex-1 w-full flex flex-col gap-2">
                <label htmlFor="email" className="text-label text-[14px] ">
                  Email
                </label>
                <input
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ email: e.target.value })}
                  type="email"
                  id="email"
                  className="bg-input py-3 px-4 rounded-md text-[14px] placeholder:text-placeholder focus:outline-0"
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4">
              <input
                type="text"
                value={code}
                className="bg-input py-3 px-4 rounded-md text-[14px] flex-1 placeholder:text-placeholder focus:outline-0"
                placeholder="Promo Code"
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
              />

              <Button
                text="Apply"
                className="bg-active py-3 px-4 rounded-lg text-main text-[14px]"
                onClick={validate}
              />
            </div>
            {error && <p className="text-alert text-[12px]">{error.message}</p>}
          </div>
          <div className="w-full lg:max-w-[387px]">
            <FinalBreakdown
              selectedExperience={selectedExperience}
              discounted={discounted!}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

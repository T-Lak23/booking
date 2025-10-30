import { API } from "../config/api";

const usePromo = () => {
  const validateCoupon = async (code: string, amount: number) => {
    const res = await API.post("/promo/validate", {
      discountCode: code,
      totalAmount: amount,
    });
    return res.data;
  };

  return { validateCoupon };
};

export default usePromo;

import { AuthContext } from "@/Context/AuthContext";
import { placeCashOrder, placeCardOrder } from "@/Services/Checkout";
import { useState, useContext } from "react";

export function useCheckout() {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  async function placeOrder(cartId, userDetails, paymentMethod) {
    try {
      setIsLoading(true);
      if (paymentMethod === "cash") {
        return await placeCashOrder(cartId, userDetails, token);
      } else {
        return await placeCardOrder(cartId, userDetails, token);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    placeOrder,
    isLoading,
  };
}

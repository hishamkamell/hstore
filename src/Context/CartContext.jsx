import { addToCart, removeCartProduct, updateProductQuantity, clearCart, applyCoupon, getCart } from "@/Services/Cart"
import { createContext, useContext, useState } from "react"
import { AuthContext } from "./AuthContext"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
export const CartContext = createContext()

export default function CartContextProvieder({ children }) {
    const queryClient = useQueryClient()
    const { token } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(null);
    const [open, setOpen] = useState(false)
    const { data } = useQuery({
        queryKey: ["cart", token],
        queryFn: () => getCart(token),
        enabled: !!token
    })
    const totalPrice = data?.totalCartPrice
    const cartProducts = data?.products
    const cartId = data?._id
    async function addToCartHandler(productId) {
        try {
            setIsLoading(productId)
            const { data: res } = await addToCart(productId, token)
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            setOpen(true)
            return res.data
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setIsLoading(null)
        }
    }
    async function removeCartProductHandler(productId) {
        try {
            const { data: res } = await removeCartProduct(productId, token)
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["cart"] })
            return res.data
        } catch (error) {
            toast.error(error.message);
        }
    }
    async function updateProductQuantityHandler(productId, quantity) {
        try {
            setIsLoading(productId)
            const { data: res } = await updateProductQuantity(productId, quantity, token)
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setIsLoading(null)
        }
    }

    async function clearCartHandler() {
        try {
            const { data: res } = await clearCart(token)
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function applyCouponHandler(coupon) {
        try {
            const { data: res } = await applyCoupon(coupon, token)
            toast.success(res.message)
        } catch (error) {

            toast.error(error.response?.data?.message);
        }
    }


    return (
        <CartContext.Provider value={{
            cartProducts,
            totalPrice,
            addToCartHandler,
            removeCartProductHandler,
            updateProductQuantityHandler,
            clearCartHandler,
            applyCouponHandler,
            isLoading,
            open, setOpen,
            cartId,
        }}>
            {children}
        </CartContext.Provider>
    )
}

import { CartContext } from "@/Context/CartContext"
import { useContext } from "react"
import {
    ButtonGroup,
    ButtonGroupText,
} from "@/components/ui/button-group"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CheckoutForm from "@/components/Forms/CheckoutForm"
import { Separator } from '@/components/ui/separator'
import CartList from "../Cart/CartList"
import { toast } from "sonner"
import { AuthContext } from "@/Context/AuthContext"
import { useQueryClient } from "@tanstack/react-query"
import { useCheckout } from "@/hooks/useCheckout"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CheckoutPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { token } = useContext(AuthContext)
    const [paymentMethod, setPaymentMethod] = useState('');
    const [couponValue, setCouponValue] = useState('');
    const { cartProducts, totalPrice, applyCouponHandler, cartId } = useContext(CartContext)
    const { placeOrder, isLoading } = useCheckout()
    async function placeOrderHandler(userDetails) {
        try {
            const { data: res } = await placeOrder(
                cartId,
                userDetails,
                paymentMethod
            );
            toast.success(res.message);
            console.log(res)
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            });
            if (paymentMethod === 'cash') {
                navigate(`/allorders`
                );
            }
        } catch (error) {
            console.log(error.response?.data.message || error.message);

        }
    }

    return (
        <div className="">
            <div className='justify-center items-center mx-4 py-6 text-primary rounded-lg '>
                <div className='text-5xl font-bold mb-4 text-center py-4 gap-4 flex flex-col justify-start'>Checkout
                    <p className='text-muted-foreground text-sm text-center font-normal'></p>
                </div>
                <div className='items-cente justify-center flex py-2'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<Link to="/home" />}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<Link to="/cart" />}>Cart</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Checkout</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 px-4">

                <div className="flex-3 flex flex-col gap-4 rounded-lg h-full">

                    <div >

                        <CheckoutForm
                            setPaymentMethod={setPaymentMethod}
                            paymentMethod={paymentMethod}
                            isLoading={isLoading}
                            totalPrice={totalPrice}
                            placeOrderHandler={placeOrderHandler} />
                    </div>


                </div>
                <div className='flex-2 flex flex-col h-full gap-4'>
                    <div className="flex flex-col gap-4 p-4 px-6 border-1 rounded-lg ">
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl text-primary font-jetbrains font-semibold '>Order Summary</span>
                            <Separator />
                        </div>
                        <CartList />
                        <Separator />
                        <div>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm text-muted-foreground'>Subtotal </span>
                                <span className='text-sm text-muted-foreground'>{new Intl.NumberFormat(
                                    "en-EG", {
                                    style: "currency",
                                    currency: "EGP",
                                }).format(totalPrice || 0)
                                } </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm text-muted-foreground'>Discount </span>
                                <span className='text-sm text-muted-foreground'>EGP 0.00 </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm text-muted-foreground'>Shipping </span>
                                <span className='text-sm text-muted-foreground'>EGP 0.00 </span>
                            </div>
                        </div>
                        <div>
                            <Separator />

                        </div>
                        <div className='flex justify-between items-center'>
                            <span className='text-md font-bold text-primary'>Total </span>
                            <span className='text-md font-bold text-primary'>{new Intl.NumberFormat(
                                "en-EG", {
                                style: "currency",
                                currency: "EGP",
                            }).format(totalPrice || 0)
                            }</span>
                        </div>
                    </div>
                    <ButtonGroup className="w-full flex-col flex gap-2 p-4 px-6 border-1 rounded-lg">
                        <Label className="text-md text-primary font-jetbrains font-semibold">Coupon</Label>
                        <div className='flex gap-3'>
                            <Input className=" border-primary/20 bg-parent" placeholder="Promo Code"
                                value={couponValue}
                                onChange={(e) => setCouponValue(e.target.value)}></Input>
                            <Button variant='outline'
                                disabled={!totalPrice}
                                onClick={() => applyCouponHandler(couponValue)}>Apply</Button>
                        </div>
                    </ButtonGroup>
                </div>
            </div>

        </div>
    )
}
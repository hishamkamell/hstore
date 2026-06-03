import React, { useContext } from 'react'
import { CheckIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/Services/Checkout'
import { Button } from '@/components/ui/button'
import { AuthContext } from '@/Context/AuthContext'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
export default function OrderComplete() {
    const { userId } = useContext(AuthContext)
    console.log(userId)
    const { data: orders } = useQuery({
        queryKey: ["order"],
        queryFn: () => getOrders(userId)
    })
    const order = orders?.[orders.length - 1];
    return (
        <div className='flex flex-col gap-4 p-4 justify-center items-center max-w-lg mx-auto'>
            <div className='flex justify-center items-center animate-pulse sm:pt-0 pt-10'>
                <CheckIcon className=' bg-green-200 text-green-800 rounded-full p-4' size={80} />
            </div>
            <div className='flex flex-col justify-center items-center '>
                <h3 className='text-2xl font-normal text-center'>Order Confirmed</h3>
                <span className='text-muted-foreground lg:text-sm text-sm text-center'>Your Order has been received and will be delivered soon</span>
            </div>

            {orders &&
                <>
                    <div className='rounded-lg border-1 w-lg flex justify-between items-center p-4 w-xs sm:w-lg '>
                        <span className=' text-sm '>Order Number</span>
                        <Badge className='text-muted-foreground text-sm bg-secondary'>#{order?.id}</Badge>
                    </div>
                    {order.user &&
                        <Accordion defaultValue={["item-1"]} className='rounded-lg w-xs sm:w-lg justify-between items-center '>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="w-xs sm:w-lg">
                                    <div className='flex justify-between items-center w-xs sm:w-lg'>
                                        <span className='text text-sm '>User Details</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>Name</span>
                                        <span className='text-muted-foreground text-sm '>{order?.user.name}</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>E-mail</span>
                                        <span className='text-muted-foreground text-sm '>{order?.user.email}</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>Phone</span>
                                        <span className='text-muted-foreground text-sm '>{order?.user.phone}</span>
                                    </div>                                    </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    }

                    {order.shippingAddress &&
                        <Accordion defaultValue={["item-1"]} className='rounded-lg border-1 w-xs sm:w-lg justify-between items-center '>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="w-xs sm:w-lg">
                                    <div className='flex justify-between items-center w-xs sm:w-lg'>
                                        <span className='text text-sm'>Shipping Details</span>
                                        <Badge className={`text-xs ${order?.isPaid ? "bg-green-200 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                                            {!order.isDelivered ? "Pending" : " ✓ Success"}</Badge>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>Order Date</span>
                                        <span className='text-muted-foreground text-sm '>
                                            {new Date(order?.createdAt).toLocaleDateString("en-GB", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>City</span>
                                        <span className='text-muted-foreground text-sm '>{order?.shippingAddress.city}</span>
                                    </div>
                                    <div className='flex justify-between items-center gap-4'>
                                        <span className='text-muted-foreground text-sm '>Address</span>
                                        <span className='text-muted-foreground text-sm text-end'>{order?.shippingAddress.details}</span>
                                    </div>

                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>Phone</span>
                                        <span className='text-muted-foreground text-sm '>{order?.shippingAddress.phone}</span>
                                    </div>


                                    <div className='flex justify-between items-center '>
                                        <span className='text-muted-foreground text-sm '>Order Items</span>
                                        <span className='text-muted-foreground text-sm '>{order?.cartItems.length} Item</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    }
                    <Accordion defaultValue={["item-1"]} className='rounded-lg border-1 w-xs sm:w-lg justify-between items-center '>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="w-xs sm:w-lg">
                                <div className='flex justify-between items-center w-xs sm:w-lg'>
                                    <span className='text text-sm '>Payment Details</span>
                                    <Badge className={`text-xs ${order.isPaid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                        {!order?.isPaid ? "Not Paid" : "Paid"}</Badge>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>

                                <div className='flex justify-between items-center '>
                                    <span className='text-muted-foreground text-sm '>Subtotal</span>
                                    <span className='text-muted-foreground text-sm '>{new Intl.NumberFormat("en-EG",
                                        { style: "currency", currency: "EGP" })
                                        .format(order?.totalOrderPrice
                                        )}</span>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <span className='text-muted-foreground text-sm '>Shipping</span>
                                    <span className='text-muted-foreground text-sm '>{new Intl.NumberFormat("en-EG",
                                        { style: "currency", currency: "EGP" })
                                        .format(order?.shippingPrice)}</span>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <span className='text-muted-foreground text-sm '>Tax</span>
                                    <span className='text-muted-foreground text-sm '>{new Intl.NumberFormat("en-EG",
                                        { style: "currency", currency: "EGP" })
                                        .format(order?.taxPrice)}</span>
                                </div>
                                <div className='flex justify-between items-center '>
                                    <span className='text-muted-foreground text-sm '>Payment Method</span>
                                    <span className='text-muted-foreground text-sm '>{order?.paymentMethodType}</span>
                                </div>
                                <div className='flex justify-between items-center border-t-1 mt-1 pt-1 '>
                                    <span className='text-muted-foreground text-sm '>Total</span>
                                    <span className='text-muted-foreground text-sm '>{new Intl.NumberFormat("en-EG",
                                        { style: "currency", currency: "EGP" })
                                        .format(order?.totalOrderPrice
                                        )}
                                    </span>
                                </div>

                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            }
            <div className='sm:w-lg w-xs flex justify-between'>
                <Link to="/" >
                    <Button variant='outline'>Back Home</Button>
                </Link>
                <Link to="/myorders"><Button variant='outline'>My Orders</Button></Link>
            </div>

        </div>

    )
}

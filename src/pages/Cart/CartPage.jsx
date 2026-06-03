import React, { useContext } from 'react'
import { getCart } from '@/Services/Cart'
import { AuthContext } from '@/Context/AuthContext'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { CartContext } from '@/Context/CartContext'
import {
    ButtonGroup,
    ButtonGroupText,
} from "@/components/ui/button-group"
import CartList from '@/pages/Cart/CartList'
import { useQuery } from '@tanstack/react-query'
import emptyCart from '@/assets/emptyCart.png'
import { Link, useNavigate } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default function Cart() {
    const { token } = useContext(AuthContext)
    const { clearCartHandler, applyCouponHandler, totalPrice } = useContext(CartContext)
    const { data } = useQuery({
        queryKey: ["cart", token],
        queryFn: () => getCart(token),
        enabled: !!token
    })
    const navigate = useNavigate()
    const cartProducts = data?.products
    function placeOrderHandler() {
        navigate('/checkout')
    }

    return (
        <>
            <div className='p-4 '>
                <div className='justify-center items-center mx-4 py-6 text-primary rounded-lg '>
                    <div className='text-5xl font-bold mb-4 text-center py-4 gap-4 flex flex-col justify-start'>
                        My Cart
                        <p className='text-muted-foreground text-sm text-center font-normal'>Explore your cart items  </p>

                    </div>
                    <div className='items-cente justify-center flex py-2'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink render={<Link to="/home" />}>Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Cart</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-4'>
                    <div className='flex-5 flex flex-col gap-4 '>
                        <div className='flex gap-2 items-center border-1 p-4 rounded-lg  justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='text-lg font-bold text-primary '>Cart Items
                                </p>
                                <p className=' text-md text-primary bg-primary/10 px-1 font-medium rounded-full'>
                                    {cartProducts?.length}
                                </p>
                            </div>
                            <div>
                                <Button variant="secondary"
                                    onClick={clearCartHandler}>
                                    <Trash />
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                        {!token ? <div className='flex flex-col gap-4 justify-center items-center'>
                            <img src={emptyCart} alt="" className='w-35' />
                            <p className='text-primary text-sm'>You are not logged in</p>
                        </div> :
                            <div className='px-4 border-1 rounded-lg' >
                                <CartList />
                            </div>}

                    </div>
                    <div className='flex-2 flex flex-col gap-4 p-4 px-6 border-1 rounded-lg h-full'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl text-primary font-jetbrains font-semibold '>Order Summary</span>
                            <Separator />

                        </div>

                        <div className='flex flex-col gap-1'>
                            {cartProducts?.map((product) => (
                                <div className='flex justify-between items-center gap-3' key={product.product._id}>
                                    <span className='text-sm text-muted-foreground text-wrap line-clamp-2'> {product.count} × {product.product.title}   </span>
                                    <span className='text-sm text-muted-foreground'> {
                                        new Intl.NumberFormat("en-EG", {
                                            style: "currency",
                                            currency: "EGP",
                                        }).format(product?.price)} </span>
                                </div>
                            ))}

                        </div>
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
                        </div>

                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-primary'>Total </span>
                            <span className='text-sm font-bold text-primary'>{new Intl.NumberFormat(
                                "en-EG", {
                                style: "currency",
                                currency: "EGP",
                            }).format(totalPrice || 0)
                            }</span>
                        </div>
                        <ButtonGroup className="w-full flex-col flex gap-2">
                            <span className="text-md text-primary font-jetbrains font-semibold">Coupon</span>
                            <div className='flex gap-3'>
                                <Input className=" border-primary/20 bg-parent" placeholder="Promo Code"></Input>
                                <Button variant='outline'
                                    disabled={!totalPrice}
                                    onClick={() => applyCouponHandler()}>Apply</Button>
                            </div>
                        </ButtonGroup>

                        <Button disabled={!totalPrice}
                            onClick={() => placeOrderHandler()}
                            className="w-full">Confirm Checkout</Button>
                    </div>
                </div>

            </div>
        </>
    )
}

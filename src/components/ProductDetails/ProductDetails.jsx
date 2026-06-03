import { Heart, ShoppingCart, Star, StarHalf, CheckCircle2, Truck, HistoryIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import CarouselImages from '../Carousel/CarouselImages';
import { Separator } from '../ui/separator';
import Reviews from '../Reviews/Reviews';
import { CartContext } from '@/Context/CartContext';
import { AuthContext } from "@/Context/AuthContext";
import LoginModal from "../auth/LoginModal";

export default function ProductDetails() {
    const { token } = useContext(AuthContext)
    const { addToCartHandler } = useContext(CartContext)
    const { id } = useParams()
    const { data: product } = useQuery({
        queryKey: ["productById"],
        queryFn: async () => {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            return res.data.data
        }
    })
    function handleAddToCart() {

    }

    return (
        <>

            <div className="min-h-screen max-w-screen">
                <div className='sm:hidden flex gap-4 fixed top-0 left-0 right-0 z-10 bg-background flex justify-between items-center  py-3 rounded-lg bg-background '>
                    <h2 className=' flex-1 text-center truncate px-25 py-2'>{product?.title} </h2>

                </div>
                <div className="max-w-6xl mx-auto px-4 py-20 sm:py-10 ">

                    <div className="flex flex-col lg:flex-row gap-10 ">
                        <div className='relative flex-1 flex flex-col gap-4'>
                            <CarouselImages Product={product} className="rounded-2xl ">

                            </CarouselImages>

                        </div>

                        <div className="flex-1 max-w-lg flex flex-col gap-5 pt-0  ">

                            <h1 className='text-3xl font-bold leading-tight tracking-tight'>{product?.title}</h1>
                            <Separator />

                            <div className="flex items-center justify-between ">

                                <div className="flex flex-col rounded-3xl border-primary border-1 border-dashed">
                                    <img src={product?.brand?.image} className=" w-16 rounded-full aspect-16/9 object-cover   dark:invert transition-all duration-400" />
                                </div>

                                <span className="text-xs text-primary/50 font-mono">{product?.category?.name} | {product?.brand?.name}-{product?.quantity}  </span>

                            </div>

                            <p className='text-muted-foreground text-md '>{product?.description}</p>
                            <div className='text-sm'>
                                <Badge variant="secondary" className="text-xs border bg-green-100 text-green-700 border-2">
                                    <div>
                                        <CheckCircle2 className="fill-green-700" size='8' />
                                    </div>
                                    In Stock

                                </Badge>
                            </div>

                            <div>
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, index) => {
                                        if (index + 1 <= product?.ratingsAverage) {
                                            return <Star key={index} className={`text-amber-600 fill-amber-600`} size={16} />
                                        }
                                        if (product?.ratingsAverage + 0.5 >= index + 1) {
                                            return <div className="relative " key={index}>

                                                <StarHalf className={`absolute text-amber-600 fill-amber-600`} size={16} />
                                                <Star className={`text-amber-600`} size={16} />

                                            </div>
                                        }
                                        else {
                                            return <Star key={index} className="text-gray-300 " size={16} />
                                        }
                                    })}
                                    <p className='px-2 text-sm text-muted-foreground'>{product?.ratingsAverage} | </p>
                                    <p className='text-sm text-muted-foreground'>{product?.ratingsQuantity} reviews</p>
                                </div >
                            </div>

                            <div className="flex items-baseline gap-3">
                                <p className=" text-4xl font-bold text-primary tracking-tight monospace ">
                                    {
                                        new Intl.NumberFormat("en-EG", {
                                            style: "currency",
                                            currency: "EGP",
                                        }).format(product?.price)}
                                </p>

                            </div>

                            <div className="flex gap-3 pt-1">

                                {!token ?
                                    <LoginModal btn={<Button className='w-full' >Add to cart</Button>}></LoginModal>
                                    :

                                    <Button
                                        onClick={() => addToCartHandler(product?._id)}
                                        className={` h-12 transition-all w-full`}
                                    >Add to Cart
                                        <ShoppingCart size={16} />
                                    </Button>
                                }
                            </div>

                            <div className='flex sm:flex-row flex-col gap-3'>
                                <div className='flex border-1 p-5 rounded-2xl flex-1 gap-3 items-center '>
                                    <div className=' h-12 w-12 flex items-center justify-center '>
                                        <Truck />
                                    </div>
                                    <div className='grid grid-cols-1'>
                                        <span className='text-sm pb-2'>Free Delivery</span>
                                        <p className='text-xs text-muted-foreground'>Enter your Postal code for Delivery Availability</p>
                                    </div>
                                </div>
                                <div className='flex border-1 p-5 rounded-2xl flex-1 gap-3 items-center'>
                                    <div className=' h-12 w-12 flex items-center justify-center border-0'>
                                        <HistoryIcon />
                                    </div>
                                    <div className='grid grid-cols-1'>
                                        <span className='text-sm'>Return Delivery
                                        </span>
                                        <p className='text-xs text-muted-foreground'>Free 30 Days Delivery Returns. Details</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div>
                        <Reviews id={id}></Reviews>
                    </div>

                </div >
            </div >
        </>


    )
}

import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Star, StarHalf } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { AuthContext } from '@/Context/AuthContext'
import LoginModal from '../auth/LoginModal'
import { Link } from 'react-router-dom'
import { CartContext } from '@/Context/CartContext'
import { Spinner } from '../ui/spinner'

export default function ProductCard({ product }) {
    const { token } = useContext(AuthContext)
    const { addToCartHandler, isLoading } = useContext(CartContext)
    return (
        <>
            <div className=" flex flex-col ">
                <Link className='cursor-pointer bg-primary/5 max-w-screen rounded-lg hover:shadow-lg hover:scale-101 border hover:border-primary duration-500 transition relative pb-2' to={`/productdetails/${product._id}`}>
                    <div className=" overflow-hidden p-4 flex justify-center items-center ">
                        <img className=" hover:rotate-1  aspect-square object-cover rounded-lg hover:scale-102 duration-500 transition " src={product.imageCover} alt={product.name} />
                    </div>
                    <div className=" rounded-lg px-4 pt-0 max-w-lg">

                        <div className="text-secondary-foreground text-sm">
                            <p className="text-secondary-foreground font-medium text-lg truncate w-full">{product.title}</p>
                            <p className="text-muted-foreground text-sm pb-2 truncate">{product.brand?.name} | {product.category?.name}</p>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-0.5 text-sm">
                                    {[...Array(5)].map((_, index) => {
                                        if (index + 1 <= product.ratingsAverage) {
                                            return <Star key={index} className="text-amber-600 fill-amber-600" size={18} />
                                        }
                                        if (product.ratingsAverage + 0.5 >= index + 1) {
                                            return <div className="relative " key={index}>

                                                <StarHalf className=" absolute text-amber-600 fill-amber-600" size={18} />
                                                <Star className="text-amber-600 " size={18} />

                                            </div>
                                        }
                                        else {
                                            return <Star key={index} className="text-gray-300 " size={18} />
                                        }
                                    })}
                                    <p>({product.ratingsAverage})</p>

                                </div >

                            </div>
                            {product.priceAfterDiscount ?
                                <p className="md:text-lg text-base font-semibold text-amber-600 pt-3">
                                    {
                                        new Intl.NumberFormat("en-EG", {
                                            style: "currency",
                                            currency: "EGP",
                                        }).format(product?.priceAfterDiscount)}
                                    <span className="text-gray-500 md:text-sm text-xs line-through font-medium"> {product.price}</span>
                                    <Badge variant="defult" className='absolute inset-y-3 left-3 m-0 z-10 bg-rose-700 text-white'>Sale</Badge>

                                </p>
                                : <p className="md:text-xl text-base font-semibold text-primary pt-3">
                                    {
                                        new Intl.NumberFormat("en-EG", {
                                            style: "currency",
                                            currency: "EGP",
                                        }).format(product?.price)}
                                </p>}

                        </div>
                    </div >

                </Link>
                <div className="py-3">
                    {!token ?
                        <LoginModal btn={<Button className='w-full' >Add to cart</Button>}></LoginModal>
                        :

                        <Button className='w-full' disabled={isLoading === product._id} onClick={() => addToCartHandler(product._id)}>{isLoading === product._id ?
                            <><Spinner className="size-4" /> Adding...</> : "Add to cart"}</Button>
                    }

                </div>
            </div >
        </>
    )
}

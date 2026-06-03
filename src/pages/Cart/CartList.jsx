import { Trash, MinusIcon, PlusIcon } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '@/Context/AuthContext'
import { CartContext } from '@/Context/CartContext'
import { Button } from '@/components/ui/button'
import emptyCart from '@/assets/emptyCart.png'
import {
    Item,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import {
    ButtonGroup,
    ButtonGroupText,
} from "@/components/ui/button-group"
import { Spinner } from '../../components/ui/spinner'

export default function CartList() {
    const { removeCartProductHandler, updateProductQuantityHandler, isLoading, cartProducts } = useContext(CartContext)
    const { token } = useContext(AuthContext)

    return (
        <>
            {
                cartProducts?.length === 0 ? <div className='flex flex-col items-center justify-center min-h-[50vh]'>
                    <img src={emptyCart} alt="empty cart" className='w-50' />
                    <p className='text-muted-foreground text-sm text-center font-normal'>Your cart is empty</p>
                </div> :
                    <div className='flex flex-col divide-y'>
                        {cartProducts?.map((product) => (
                            <div key={product.product._id} >
                                <Item variant='default' className="flex gap-2 px-0 hover:scale-101 transition-all rounded-lg ">
                                    <div className='flex justify-start items-center flex-1 gap-6'>
                                        <ItemMedia variant="icon" className="">
                                            <img className='border-1 aspect-square h-18 object-cover rounded-lg' src={product.product.imageCover} alt={product.product.title} />
                                        </ItemMedia>
                                        <div className=' truncate'>
                                            <ItemTitle className='text-secondary-foreground font-medium md:text-lg text-wrap line-clamp-2 truncate max-w-md'>{product.product.title}</ItemTitle>
                                            <ItemDescription>{product.product.brand?.name} | {product.product.category.name}</ItemDescription>
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center flex-2  sm:justify-between gap-6 shrink-0'>
                                        <div className='flex sm:flex-col gap-5 justify-between items-center'>
                                            {product.priceAfterDiscount ?
                                                <p className="md:text-lg text-base font-semibold text-amber-600 pt-3">
                                                    {
                                                        new Intl.NumberFormat("en-EG", {
                                                            style: "currency",
                                                            currency: "EGP",
                                                        }).format(product?.priceAfterDiscount)}
                                                    <span className="text-gray-500 md:text-sm text-xs line-through font-medium"> {product.price}</span>

                                                </p>
                                                :
                                                <p className="text-md md:text-lg text-base font-semibold text-primary">
                                                    {
                                                        new Intl.NumberFormat("en-EG", {
                                                            style: "currency",
                                                            currency: "EGP",
                                                        }).format(product?.price)}
                                                </p>}

                                        </div>
                                        <ButtonGroup variant="default" className="border-1 rounded-full bg-primary/5">
                                            <Button variant="outline" size="xs" className="border-0 bg-primary/5"
                                                onClick={() => updateProductQuantityHandler(product.product._id, product.count + 1)}>
                                                <PlusIcon />
                                            </Button>
                                            <ButtonGroupText size="xs" className="bg-parent w-10 justify-center border-0">{isLoading === product.product._id ? <Spinner /> : product.count}</ButtonGroupText>
                                            <Button variant="outline" size="xs" className="border-0 bg-primary/5"
                                                disabled={product.count === 1}
                                                onClick={() => updateProductQuantityHandler(product.product._id, product.count - 1)}>
                                                <MinusIcon />
                                            </Button>

                                        </ButtonGroup>

                                        <Button variant="destructive" size='icon' onClick={() => removeCartProductHandler(product.product._id)}>
                                            <Trash />
                                        </Button>
                                    </div>
                                </Item>
                            </div>
                        ))
                        }
                    </div>
            }

        </>

    )
}

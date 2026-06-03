import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CartList from "@/pages/Cart/CartList"
import { Button } from "./button"
import { CartContext } from "@/Context/CartContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

export default function CartSheet({ btn }) {
    const { cartProducts, totalPrice, open, setOpen } = useContext(CartContext)
    return (
        <div className="">
            <Sheet onOpenChange={setOpen} open={open} >
                <SheetTrigger render={btn}></SheetTrigger>
                <SheetContent className="flex flex-col py-6 gap-4 pl-3 pr-6" showCloseButton={false}>
                    <div className="flex items-center justify-between px-4 ">
                        <h3 className="text-xl font-semibold text-primary">Cart</h3>
                        <span className="text-muted-foreground ">{cartProducts?.length} Items</span>
                    </div>
                    <div className="no-scrollbar overflow-y-auto rounded-lg  pr-5">
                        <CartList ></CartList>
                    </div>

                    <SheetFooter className=" px-1 py-0">
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-primary'>Total </span>
                            <span className='text-sm font-bold text-primary'>{new Intl.NumberFormat(
                                "en-EG", {
                                style: "currency",
                                currency: "EGP",
                            }).format(totalPrice)
                            }</span>
                        </div>
                        <Link to="/cart" >
                            <Button onClick={() => setOpen(false)} className="w-full">View Cart & Checkout</Button>
                        </Link>
                    </SheetFooter>
                </SheetContent>

            </Sheet>
        </div>

    )
}

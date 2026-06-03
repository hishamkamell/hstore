import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/Services/Checkout"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Package, PencilIcon } from "lucide-react"
import { MoveRight } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useVerify } from "@/hooks/useVerify"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
export default function Orders() {
    const { data: verify } = useVerify()
    const { data: userOrders } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => getOrders(verify?.decoded.id),
        enabled: !!verify
    })
    console.log(userOrders)
    return (
        <div className=" max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-4  pt-10">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-3xl md:text-4xl tracking-tight py-4 text-primary">My Orders</h2>

                <Link to="/profile">
                    <Button>
                        My Profile
                        <MoveRight className="size-4" />
                    </Button>
                </Link>
            </div>
            <div className="flex text-center justify-center items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/home" />}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>My Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {userOrders?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => {
                    return (
                        <div key={order.id} className="">

                            <Accordion type="single" collapsible defaultValue={["item-1"]}>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-4 py-0">
                                            <span className='text-2xl font-semibold text-primary'>Order Number</span>
                                            <Badge className='text-muted-foreground text-sm bg-primary/10'>#{order?.id}</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent >
                                        <div className="grid grid-cols-1 gap-1">
                                            <div className="flex gap-4 justify-between">
                                                <span className='text-sm text-muted-foreground '>Order Date</span>
                                                <span className='text-sm  '>{new Date(order?.createdAt).toLocaleDateString("en-GB", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}</span>
                                            </div>
                                            <div className="flex gap-4 justify-between">
                                                <span className='text-sm text-muted-foreground '>Shipping Address</span>
                                                <span className='text-sm  '>{order?.shippingAddress?.city}</span>
                                            </div>
                                            <div className="flex gap-4 justify-between">
                                                <span className='text-sm text-muted-foreground '>Payment Method</span>
                                                <span className='text-sm  '> {order?.paymentMethodType}</span>
                                            </div>
                                            <div className="flex gap-4 justify-between">
                                                <span className='text-sm text-muted-foreground '>Total Price</span>
                                                <span className='text-sm  '> {new Intl.NumberFormat("en-EG",
                                                    { style: "currency", currency: "EGP" })
                                                    .format(order?.totalOrderPrice)}</span>
                                            </div>

                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-4">
                                            <span className='text-xl font-semibold text-primary'>Order Items</span>
                                            <Badge className='text-muted-foreground text-sm bg-primary/10'>#{order?.cartItems?.length} Items</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Separator />
                                        <Separator />
                                        <div className="flex flex-col gap-3 ">
                                            {order?.cartItems.map((item) =>
                                            (
                                                <div key={item.id} className="flex items-center justify-between">
                                                    <div className="flex gap-4 items-center">
                                                        <span className='text-sm '> {item?.count} ×</span>

                                                        <div className="w-8 ">
                                                            <img src={item?.product?.imageCover} alt="" className="rounded-lg" />
                                                        </div>
                                                        <span className='text-sm '> {item?.product.title}</span>

                                                    </div>

                                                    <span className='text-sm '> {new Intl.NumberFormat("en-EG",
                                                        { style: "currency", currency: "EGP" })
                                                        .format(item?.price)}</span>

                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </div>
                    )
                })}

            </div>
        </div>
    )
}

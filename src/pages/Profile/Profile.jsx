import { useQuery } from "@tanstack/react-query"
import UpdateUser from "./UpdateUser"
import { useVerify } from "@/hooks/useVerify"
import { getOrders } from "@/Services/Checkout"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge, Package, PencilIcon } from "lucide-react"
import { MoveRight } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import UserOrders from "../Orders/Orders"


export default function Profile() {
    const { data: verify } = useVerify()
    const { data: userOrders } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => getOrders(verify?.decoded.id),
        enabled: !!verify
    })

    return (
        <div className="flex order">

            <div className="flex-4 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-4 pt-10">

                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-3xl md:text-4xl tracking-tight py-4 text-primary">My Profile</h2>

                    <Link to="/myorders">
                        <Button>
                            My Orders
                            <MoveRight className="size-4" />
                        </Button>
                    </Link>
                </div>
                <div className="flex  text-center justify-center items-center">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<Link to="/home" />}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>My Profile</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className=" border border-primary rounded-lg p-4 px-8 flex items-center gap-5 ">
                    <div className=' h-16 w-16 flex items-center justify-center border rounded-full bg-amber-500/35 flex-shrink-0'>
                        <img src="https://notion-avatars.netlify.app/api/avatar/?face=8&nose=3&mouth=17&eyes=4&eyebrows=1&glasses=1&hair=2&accessories=0&details=0&beard=0&halloween=0&christmas=0" alt="Notion Avatar" />
                    </div>
                    <div className=" flex justify-between items-center w-full">
                        <div className="flex flex-col">
                            <span className='text-xl text-primary font-semibold '> {userOrders ? userOrders[0]?.user?.name : verify?.decoded.name}</span>
                            <span className='text-sm text-muted-foreground  '> {verify?.decoded.role}</span>
                        </div>
                        <div>
                            <UpdateUser btn={<Button variant="outline" className="border-1 border-primary text-primary">
                                Edit
                                <PencilIcon className="size-4" />
                            </Button>} />

                        </div>

                    </div>
                </div>
                {userOrders?.length > 0 ?
                    <div className=" border border-primary rounded-lg p-8 flex flex-col gap-5 ">
                        <span className='text-xl text-primary font-jetbrains font-semibold '> Personal Information</span>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span>Full Name</span>
                                <span className="text-muted-foreground text-sm">{userOrders[0]?.user?.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span>Email Address</span>
                                <span className="text-muted-foreground text-sm">{userOrders[0]?.user?.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span>Mobile Number</span>
                                <span className="text-muted-foreground text-sm">{userOrders[0]?.user?.phone}</span>
                            </div>
                            <div className="flex flex-col">
                                <span>City</span>
                                <span className="text-muted-foreground text-sm">{userOrders[0]?.shippingAddress?.city}</span>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <UpdateUser />

                    </div>

                }
            </div>


            {/*      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4 border border-primary rounded-lg ">
                <UserOrders userOrders={userOrders} />
            </div> */}
        </div >
    )
}
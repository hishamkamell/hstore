import { Link } from "react-router-dom"
import { MoveRight } from "lucide-react"
import ProductCard from "../ProductCard/ProductCard"
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function BigSale({ products }) {
    const discountedProducts = products?.filter((product) => product.priceAfterDiscount);
    return (
        <section className="from-background to-accent/20 relative bg-linear-to-b">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className=" py-8">
                    <div className="flex items-start justify-between">
                        <h2 className="font-semibold text-4xl tracking-tight">Best Sellers</h2>
                        <div>
                            <Link to="/shop">
                                <Button variant="outline" className="border-1 border-primary text-primary">
                                    View All
                                    <MoveRight className="size-4" />
                                </Button>
                            </Link>
                        </div>

                    </div>
                    <p className="mt-2 text-pretty text-lg text-muted-foreground leading-snug">
                        Explore Big Saled Products
                    </p>
                </div>

                <div className="mx-auto">
                    <Carousel className="mt-6 w-full" opts={{ loop: true, align: "start" }}>
                        <CarouselContent>
                            {
                                discountedProducts?.map((product) => (
                                    <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4" key={product?._id} >
                                        <ProductCard product={product} />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                        <div className="mt-4 flex items-center justify-between sm:justify-end">
                            <div className="flex items-center justify-end gap-1.5">
                                <CarouselPrevious className="-left-10 max-md:static max-md:translate-y-0" />
                                <CarouselNext className="-right-10 max-md:static max-md:translate-y-0" />
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>

    )
}

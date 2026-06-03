
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import getBrands from "@/Services/Brands"

export default function BrandsSection() {
    const { data: Brands } = useQuery({
        queryKey: ["Brands"],
        queryFn: async () => getBrands(),
    })
    return (
        <section className="overflow-hidden py-8">
            <div className="max-w-7xl mx-auto py-4 md:py-16 px-4 lg:px-8">
                <div className=" py-8">
                    <div className="flex items-start justify-between">
                        <h2 className="font-semibold text-4xl tracking-tight">Top Brands</h2>
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
                        Explore products from the world's most trusted brands.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute left-0 top-0 z-10 h-full sm:w-60 bg-gradient-to-r from-background to-transparent pointer-events-none" />

                    <div className="absolute right-0 top-0 z-10 h-full sm:w-60 bg-gradient-to-l from-background to-transparent pointer-events-none" />

                    <Carousel
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 1000,
                                stopOnInteraction: false,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {Brands?.map((brand) => (
                                <CarouselItem
                                    key={brand._id}
                                    className="basis-1/3 md:basis-1/4 lg:basis-1/7"
                                >
                                    <Link to={`/shop?brand=${brand._id}`}>
                                        <div className="p-4 hover:border-2 border-primary dark:invert rounded-lg " loading="lazy">
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="h-20 w-full object-contain "
                                            />
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

            </div>

        </section>
    );
}

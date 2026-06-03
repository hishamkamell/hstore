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
import ReviewsCard from "../Reviews/ReviewsCard"
import { getAllReviews } from "@/Services/reviews"

export default function TestimonialsSection() {
    const { data: reviews } = useQuery({
        queryKey: ["allReviews"],
        queryFn: () => getAllReviews(),
    })

    return (
        <section className="overflow-hidden">
            <div className="max-w-7xl mx-auto pt-16 px-4 flex flex-col gap-16 sm:px-6 lg:px-8">
                <div className="">
                    <div className="flex items-start justify-between">
                        <h2 className="font-semibold text-3xl md:text-4xl tracking-tight">Customer Reviews</h2>
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
                        See what our customers have to say about us.
                    </p>
                </div>
                <div className="relative">
                    <Carousel
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                                stopOnInteraction: false,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {reviews?.map((review) => (
                                <CarouselItem
                                    key={review._id}
                                    className="basis-1/1 md:basis-1/2 lg:basis-1/3 "
                                >
                                    <div className="p-1">
                                        <ReviewsCard review={review} />
                                    </div>

                                </CarouselItem>
                            ))}

                        </CarouselContent>
                    </Carousel>
                </div>

            </div>

        </section>
    )
}

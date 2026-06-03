"use client";
import Autoplay from "embla-carousel-autoplay"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ArrowRight,
  Star,
  TrendingUp,
  ShoppingBag,
  Flame,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link, useNavigate } from "react-router-dom";


const storeData = {
  title: "Discover Your Perfect Style",
  subtitle:
    "Explore our curated collection of premium products. Each piece is handpicked for those who appreciate quality and style.",
};

export default function HeroSection({ products }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [api, setApi] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);

  const randomProducts = products
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 3);


  return (
    <section className="from-background to-accent/20 relative bg-linear-to-b">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <header className="flex flex-col gap-8">
            <Badge
              variant="outline"
              className="h-auto w-fit font-semibold rounded-full px-4 py-2 flex items-center gap-2"
            >
              <TrendingUp className="size-4" />
              New Collection 2026
            </Badge>

            <h1 className="text-5xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl">

              <span className="text-primary"> Shop  </span> Smarter,
              Save More
            </h1>
            <p className="text-muted-foreground max-w-lg text-xl text-balance">
              Discover amazing deals, premium brands, and fast delivery on every order.
            </p>

            <div className="relative max-w-md">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-full pe-4 pl-12 text-lg"
                aria-label="Search products"
              />
              <Search className="text-muted-foreground absolute start-4 top-1/2 size-5 -translate-y-1/2" />
              <Button
                onClick={() => navigate(`/shop?search=${searchQuery}`)}
                disabled={!searchQuery}
                size="lg"
                className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-6 h-10"
              >
                Search
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="h-10 cursor-pointer rounded-full px-4"
                >
                  Shop Now
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </header>

          <div className="flex flex-col gap-4">
            <div className="relative h-[500px] w-full border-0">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
                className="group size-full"
              >
                <CarouselContent className="h-full">
                  {randomProducts?.map((product) => (
                    <CarouselItem key={product.id} className="h-full" >
                      <Card className="relative size-full border-1 overflow-hidden py-4">
                        <CardContent className="px-4">
                          <div className="relative size-full overflow-hidden rounded-md">
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="h-[500px] w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="from-background/90 via-background/30 absolute inset-0 bg-linear-to-t to-transparent" />
                          <Badge variant="" className="px-2.5 py-0.5 absolute top-6 left-6 font-normal bg-rose-600 dark:bg-rose-300 w-fit rounded-full">
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                              </svg>
                            </div>

                            New
                          </Badge>
                          <div className="text-background-foreground absolute inset-0 flex flex-col justify-end p-8">
                            <div className="relative z-10 max-w-md flex flex-col gap-4">

                              <h2 className="text-4xl font-bold line-clamp-3">
                                {product.title}
                              </h2>
                              <div className="flex items-center gap-4 pt-2">
                                <Link to={`/productdetails/${product._id}`}>
                                  <Button
                                    size="lg"
                                    className="h-10 px-8 cursor-pointer rounded-full">
                                    Shop Now
                                  </Button>
                                </Link>

                                <div className="text-foreground flex items-center gap-1">
                                  <Star className="fill-foreground size-5" />
                                  <span className="font-medium">
                                    {product.ratingsAverage}
                                  </span>
                                  <span className="text-foreground/80">
                                    ({product.ratingsQuantity} reviews)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

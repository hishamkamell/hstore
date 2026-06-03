import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselImages({ Product }) {
  const [api, setApi] = useState();
  const [active, setActive] = useState(0);
  const images = [Product?.imageCover, ...Product?.images || []];
  function setActiveImage(i) {
    api?.scrollTo(i)
    setActive(i)
  }
  useEffect(() => {
    if (!api) return

    const updateActive = () => {
      setActive(api.selectedScrollSnap())
    }

    updateActive()

    api.on("select", updateActive)

    return () => {
      api.off("select", updateActive)
    }
  }, [api])
  return (
    <div>
      <Carousel
        className='relative'
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {images?.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <img
                  src={image}
                  className=" relative rounded-2xl overflow-hidden aspect-square max-w-[540px] mx-auto w-full h-full object-cover transition-all duration-500"
                  alt=""
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious /* onClick={() => setActiveImage(active - 1)} */ className='absolute left-6' />
        <CarouselNext /* onClick={() => setActiveImage(active + 1)} */ className='absolute right-6' />
      </Carousel>
      <div className="grid grid-cols-5 gap-3 justify-start max-w-[540px] mx-auto w-full pt-4 mx-4">
        {images?.map((img, i) => (
          <button
            key={i}
            onMouseEnter={() => setActiveImage(i)}
            className={`w-20 h-20 rounded-xl overflow-hidden transition-all duration-500 ${i === active ? "border-1 border-primary " : ""}`}          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

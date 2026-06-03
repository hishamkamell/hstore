import HeroSection from "@/components/Sections/HeroSection"
import CategorySection from "@/components/Sections/CategorySection"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "@/Services/Products"
import BigSale from "@/components/Sections/BigSaleSection"
import Features from "@/components/Sections/FeaturesSection"
import BrandsSection from "@/components/Sections/BrandsSection"
import Testimonials from "@/components/Sections/TestimonialsSection"
import Navbar from "@/components/Navbar/Navbar"
import MobileNav from "@/components/Navbar/MobileNav"


export default function Home() {

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => getAllProducts(),
  })




  return (

    <div >
      <HeroSection products={products?.data} />
      <Features />
      <CategorySection />
      <Testimonials />
      <BigSale products={products?.data} />
      <BrandsSection />
    </div>

  )
}

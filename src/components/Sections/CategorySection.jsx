import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { MoveRight } from "lucide-react"
import getCategories from "@/Services/Categories"
import { useQuery } from "@tanstack/react-query"

export default function CategorySection() {
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => getCategories(),
    })
    return (
        <section className="from-background to-accent/20 relative bg-linear-to-b">

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-start justify-between py-8">
                    <div>
                        <h2 className="font-semibold text-4xl tracking-tight">Our Categories</h2>
                    </div>
                    <Link to="/shop">
                        <Button variant="outline" className="border-1 border-primary text-primary">
                            See All
                            <MoveRight className="size-4" />
                        </Button>
                    </Link>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 md:gap-4 ">
                    {categories?.map((category) => (
                        <Link to={`/shop?category=${category._id}`} key={category._id} className=" flex flex-col p-8 gap-4 rounded-lg  transtion-all duration-300">
                            <div className="aspect-square grayscale hover:grayscale-0 hover:scale-105 rounded-lg transition-all duration-300">
                                <img src={category.image} loading="lazy"
                                    className="aspect-square object-cover rounded-full" />
                            </div>
                            <h3 className="text-center">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

    )
}

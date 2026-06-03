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
import { SlidersHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import Filter from "./Filter"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export default function Filter2({ btn, categories, productsData, setCategoriesFilter, categoriesFilter, priceFilter, setPriceFilter, brands, setBrandsFilter, brandsFilter, setPage }) {
    const [open, setOpen] = useState(false)

    return (
        <div className=''>
            <Sheet onOpenChange={setOpen} open={open} >
                <SheetTrigger render={btn}></SheetTrigger>
                <SheetContent side='left' className="bg-background" showCloseButton={false}>
                    <div className="no-scrollbar overflow-y-auto p-4">
                        <Filter
                            className="mr-5"
                            setPriceFilter={setPriceFilter}
                            priceFilter={priceFilter}
                            setCategoriesFilter={setCategoriesFilter}
                            categoriesFilter={categoriesFilter}
                            categories={categories}
                            brands={brands}
                            setBrandsFilter={setBrandsFilter}
                            brandsFilter={brandsFilter}
                            setOpen={setOpen}
                            setPage={setPage}>
                        </Filter>
                    </div>

                </SheetContent>

            </Sheet>

        </div >
    )
}

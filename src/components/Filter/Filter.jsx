
import { SlidersHorizontal } from 'lucide-react'
import React from 'react'
import { Button } from "../ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from '../ui/separator'
import { useNavigate } from 'react-router-dom'

export default function Filter({ categories, setCategoriesFilter, categoriesFilter, priceFilter, setPriceFilter, brands, setBrandsFilter, brandsFilter, setPage, setOpen }) {
    const Navigate = useNavigate()
    function setCategoriesFilterFunction(category) {
        if (categoriesFilter.includes(category)) {
            setCategoriesFilter(categoriesFilter.filter((item) => item !== category))
            return
        }
        setCategoriesFilter([...categoriesFilter, category])
        setPage(1)
        setOpen(false)
    }
    function setBrandsFilterFunction(brand) {
        if (brandsFilter.includes(brand)) {
            setBrandsFilter(brandsFilter.filter((item) => item !== brand))
            return
        }
        setBrandsFilter([...brandsFilter, brand])
        setPage(1)
        setOpen(false)
    }
    function setPriceFilterFunction(value) {
        setPriceFilter(value)
        setPage(1)
        setOpen(false)
    }
    function reset() {
        setCategoriesFilter([])
        setBrandsFilter([])
        setPriceFilter([1, 50000])
        setPage(1)
        setOpen(false)
        Navigate('/shop')
    }
    return (
        <>
            <div className='flex flex-col gap-4'>
                <div>
                    <div className='flex flex-col gap-2 border-1 border-primary/10 p-4 rounded-lg'>
                        <div className='flex gap-2 items-center justify-between'>
                            <div className='flex gap-2 items-center'>
                                <span className='text-lg text-primary font-jetbrains font-semibold ml-3'>Filter</span>
                            </div>
                            <div className="">
                                <Button onClick={reset} size='xs'> Reset</Button>
                            </div>

                        </div>
                    </div>
                </div>


                <div className='flex flex-col gap-2 border-1 border-primary/10 p-4 rounded-lg gap-5'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-2 items-center justify-between'>
                            <div className='flex gap-2 items-center'>
                                <span className='text-lg text-primary font-jetbrains font-semibold ml-3'>Categories</span>
                            </div>
                        </div>
                        <Separator />

                        <div className="">
                            <div className="flex flex-col gap-1">
                                {categories?.map((category) => (
                                    <div key={category?._id}>
                                        <Button variant={categoriesFilter.includes(category?._id) ? "default" : "ghost"} className=' rounded-full transtion-all duration-600 flex items-center hover:bg-primary/20 dark:hover:bg-primary/50
                                          w-full justify-start h-5 text-md'
                                            onClick={() => setCategoriesFilterFunction(category?._id)}>
                                            {/*  <img src={category?.image} alt="" className="w-8 rounded-full aspect-16/8 object-cover grayscale hover:grayscale-0 " /> */}
                                            {category?.name}</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 pb-4'>
                        <div className='flex gap-2 items-center'>
                            <span className='text-lg text-primary font-jetbrains font-semibold ml-3'>Price</span>
                        </div>

                        <Separator />

                        <div className="flex flex-col px-2 gap-2 py-3">
                            <div className='flex justify-between items-center'>
                                <Label htmlFor="price">{priceFilter[0]}</Label>
                                <Label htmlFor="price">{priceFilter[1]}</Label>

                            </div>
                            <Slider
                                id="price"
                                value={priceFilter}
                                min={1}
                                max={50000}
                                onValueChange={(value) => setPriceFilterFunction(value)}
                                step={1}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-2 items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <span className='text-lg text-primary font-jetbrains font-semibold ml-3'>Brands</span>
                                </div>
                            </div>
                            <Separator />

                            <div className="p-1">
                                <div className="text-xs grid grid-cols-4 gap-2 ">
                                    {brands?.map((brand) => (
                                        <div key={brand?._id}>
                                            <Button variant={"ghost"} className={`p-0 m-0 text-xs hover:bg-foreground-0`}
                                                onClick={() => setBrandsFilterFunction(brand?._id)}>
                                                <img src={brand?.image} alt="" className={`rounded-4xl aspect-16/8 object-cover transtion-all duration-600 hover:scale-105 ${brandsFilter.includes(brand?._id) ? " border-2  invert-10 " : "dark:invert"}`} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

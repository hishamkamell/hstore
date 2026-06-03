import Filter from '@/components/Filter/Filter';
import Filter2 from '@/components/Filter/Filter2';
import ProductsGrid from '@/components/ProductCard/ProductsGrid';
import { Button } from '@/components/ui/button';
import getCategories from '@/Services/Categories';
import getBrands from '@/Services/Brands';
import getsProducts from '@/Services/Products';
import { useQuery } from '@tanstack/react-query';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    Select,
    SelectLabel,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
export default function Shop() {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get("search")
    const categoryQuery = searchParams.get("category")
    const brandsQuery = searchParams.get("brand")
    const [searchKey, setSearchKey] = useState("");
    const [limit, setLimit] = useState(12)
    const [pageFilter, setPage] = useState(1)
    const [sortingFilter, setSort] = useState(null)
    const [categoriesFilter, setCategoriesFilter] = useState(categoryQuery ? [categoryQuery] : [])
    const [priceFilter, setPriceFilter] = useState([1, 50000])
    const [brandsFilter, setBrandsFilter] = useState(brandsQuery ? [brandsQuery] : [])
    const items = [
        { label: "Default", value: null },
        { label: "Highest Price", value: "-price" },
        { label: "Lowest Price", value: "price" },
        { label: "Top Rated", value: "-ratingsAverage" },
        { label: "Newest", value: "-createdAt" },
        { label: "Oldest", value: "createdAt" },
    ]
    const { data, isError: productsIsError, isLoading: productsLoading, productsError } = useQuery({
        queryKey: ["products", categoriesFilter, priceFilter, sortingFilter, pageFilter, brandsFilter],
        queryFn: async () => getsProducts(categoriesFilter, priceFilter, sortingFilter, pageFilter, limit, brandsFilter),
    })
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => getCategories()
    })
    const { data: brands } = useQuery({
        queryKey: ["brands"],
        queryFn: async () => getBrands()
    })

    const searchQueryProducts = data?.data.filter((product) =>
        product?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    )
    const productsData = searchQuery ? searchQueryProducts : data?.data
    const productsResult = searchQuery ? searchQueryProducts?.length : data?.results
    const totalPages = searchQuery ? searchQueryProducts?.length / limit : data?.metadata?.numberOfPages || 1
    const currPage = data?.metadata?.currentPage || 1
    const pages = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    )

    return (
        <>

            <div className=' px-4 flex justify-center'>

                <main className='w-[100rem]'>

                    <div className='transition-all  justify-between items-center mx-4 py-6 text-primary rounded-lg '>
                        <div className='text-5xl font-bold mb-4 text-center py-2  '>
                            Shop
                        </div>

                        <p className='text-muted-foreground text-sm text-center'>Explore Popular Products</p>
                    </div>

                    <div className='items-cente justify-center flex py-2'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink render={<Link to="/home" />}>Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Shop</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='flex gap-2 sm:hidden items-center'>
                        <Filter2
                            setPriceFilter={setPriceFilter}
                            priceFilter={priceFilter}
                            setCategoriesFilter={setCategoriesFilter}
                            categoriesFilter={categoriesFilter}
                            categories={categories}
                            productsData={productsData}
                            brands={brands}
                            setBrandsFilter={setBrandsFilter}
                            brandsFilter={brandsFilter}
                            setPage={setPage}
                            className='border-2 p-4 rounded-full'
                            btn={<Button size='icon' variant='outline' >
                                <Funnel size={24} strokeWidth={1.5} />
                            </Button >}>
                        </Filter2>
                        <div className=" w-full relative">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                className=" rounded-full pe-4 pl-12 text-xs w-full"
                                aria-label="Search products"
                            />
                            <Button
                                onClick={() => navigate(`/shop?search=${searchKey}`)}
                                disabled={!searchKey}
                                size="icon-sm"
                                className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full h-6 z-10"
                            >
                                <Search className="" />
                            </Button>
                        </div>
                    </div>

                    <div className='flex justify-between items-center my-4 text-primary px-4 py-3 rounded-lg border-1'>
                        <div className='flex gap-2 sm:gap-4 items-center'>

                            <div className='flex flex-col gap-0.5 justify-between items-start'>
                                <div className='flex justify-center items-center'>
                                    <h3 className='sm:text-lg font-bold text-sm'>Result
                                    </h3>
                                    <span className='text-xs text-primary bg-primary/10 p-0.5 sm:mx-2 font-normal mx-1 rounded-full'> {productsResult}  </span>

                                </div>
                                <div className='flex justify-center items-center gap-2'>

                                    <p className=' text-primary text-xs rounded-full'>Page |
                                    </p>
                                    <span className=' text-muted-foreground text-xs bg-primary/10 px-1 rounded-full'>
                                        {pageFilter}
                                    </span>
                                </div>

                            </div>
                        </div>
                        {
                            searchQuery &&
                            <div className='flex gap-2 sm:gap-4 items-center'>
                                <div className='flex justify-center items-center gap-2'>
                                    <p className=' text-primary text-xs rounded-full'>Search |
                                    </p>
                                    <span className='relative text-secondary text-xs bg-primary px-2  py-1 rounded-full'>
                                        {searchQuery}
                                        <Button size="icon-xs" variant="outline"
                                            className=" absolute top-0 right-0 -translate-y-1/4 translate-x-1/2 h-4 w-4 text-muted-foreground dark:bg-background/90"
                                            onClick={() => setSearchParams([])}>×</Button>
                                    </span>

                                </div>
                            </div>

                        }
                        <div className='flex justify-center items-center gap-4'>
                            <div>
                                <Select
                                    items={items}
                                    onValueChange={setSort}
                                >
                                    <SelectTrigger className=" border-1 border-primary">
                                        <SelectValue className="text-xs" placeholder="Default" />
                                    </SelectTrigger>
                                    <SelectContent className='rounded-lg'>
                                        <SelectGroup>
                                            <SelectLabel className="text-xs">Sorting As</SelectLabel>
                                            {items.map((item) => (
                                                <SelectItem
                                                    className="text-xs"
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='flex-1 hidden sm:block'>
                            <Filter
                                setPriceFilter={setPriceFilter}
                                priceFilter={priceFilter}
                                setCategoriesFilter={setCategoriesFilter}
                                categoriesFilter={categoriesFilter}
                                categories={categories}
                                productsData={productsData}
                                brands={brands}
                                setBrandsFilter={setBrandsFilter}
                                brandsFilter={brandsFilter}
                                setPage={setPage}
                                open={open} setOpen={setOpen}
                            >
                            </Filter>
                        </div>
                        <div className='flex-3'>
                            <ProductsGrid
                                productsError={productsError}
                                productsIsError={productsIsError}
                                productsData={productsData}
                                productsLoading={productsLoading}
                                productsResult={productsResult}></ProductsGrid>
                        </div>
                    </div>
                </main>

            </div>
            <div className='p-8'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e) => {
                                e.preventDefault();
                                if (currPage > 1) setPage(currPage - 1)
                            }} />
                        </PaginationItem>

                        {pages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === pageFilter}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page)
                                    }}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext text="Next" onClick={(e) => (currPage < totalPages && setPage(currPage + 1))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

        </>
    )
}

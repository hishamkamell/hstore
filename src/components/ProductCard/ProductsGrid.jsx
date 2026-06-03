import ProductCard from '@/components/ProductCard/ProductCard';
import { Spinner } from '../ui/spinner';
import { FrownIcon } from 'lucide-react';
import notFound from '@/assets/notfound.svg';

export default function ProductsGrid({ productsData, productsLoading, productsResult, productsError, productsIsError }) {
  return (
    <>
      <div>
        {productsLoading && <div className='flex justify-center items-center h-[70vh] w-full'>
          <Spinner className="size-12" />
        </div>}
        {productsIsError && <div className='flex justify-center items-center h-[70vh] w-full'>
          <p>
            {productsError}
          </p>
        </div>}
        {
          productsResult ?
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4'>
              {productsData?.map((product) => (
                <ProductCard key={product?._id} product={product} />

              ))}
            </div>
            :
            <div className='flex flex-col relative text-primary max-w-lg mx-auto gap-4 items-center justify-center h-[70vh]'>
              <img src={notFound} alt="" className='aspect-square ' />
              <h1 className='text-normal absolute bottom-15'>No Results found
              </h1>

            </div>
        }
      </div>
    </>

  )
}

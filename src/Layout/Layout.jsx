import { use, useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import CartSheet from '@/components/ui/CartSheet'
import { Button } from '@/components/ui/button'
Button

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <div>
      <nav className='sticky top-0 z-50 '>
        <Navbar />
      </nav>
      <main className='relative mb-20'>
        <Button variant="ghost" className="bg-background border border-primary/10 ml-2 sm:hidden absolute top-3 left-3 fixed z-50" onClick={() => window.history.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>

        </Button>
        <div className='animate-fade-in sm:px-10 pt-8 sm:py-0' key={pathname}>
          <Outlet ></Outlet>
        </div>
        <CartSheet />
      </main>
      <div className='pb-20 sm:pb-0'>
        <Footer />

      </div>
    </div>
  )
}

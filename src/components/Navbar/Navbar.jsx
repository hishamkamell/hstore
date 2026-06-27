import React, { useContext, useState } from 'react'
import BlackLogo from '@/assets/logo2.png'
import WhiteLogo from '@/assets/logo.png'
import { LogOut, CircleUserRound, Menu, ShoppingCartIcon, Search, SunIcon, MoonIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import MobileNav from './MobileNav';
import { ThemeProviderContext } from '@/components/ui/theme';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '@/Context/CartContext';
import { Badge } from "@/components/ui/badge"
import myAvatar from '@/assets/myAvatar.svg'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useVerify } from '@/hooks/useVerify';
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const ThemeContext = useContext(ThemeProviderContext);
  const { theme, setTheme } = ThemeContext;
  const { data: user } = useVerify()
  const { token, login, logout } = useContext(AuthContext);
  const { cartProducts, setOpen } = useContext(CartContext);
  const cartItems = cartProducts?.length
  return (
    <>
      <div className='transition-all md:flex gap-12 hidden justify-between items-center m-4 text-foreground px-5 py-3 rounded-lg border-1 border-primary/20 bg-background'>
        <div className='w-25 shrink-0'>
          <Link to="/" >
            <img src={theme === 'dark' ? BlackLogo : WhiteLogo} alt="Logo" />
          </Link>
        </div>
        <div className=''>
          <NavigationMenu className='hidden sm:flex '>
            <NavigationMenuList className=" lg:gap-16 md:gap-0">
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link to="/home">Home</Link>}
                  className={navigationMenuTriggerStyle()}></NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link to="/shop">Shop</Link>}
                  className={navigationMenuTriggerStyle()}>Shop</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-4 grow">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" rounded-full w-full"
            aria-label="Search products"

          />
          <Button
            onClick={() => navigate(`/shop?search=${searchQuery}`)}
            disabled={!searchQuery}
            size="icon"
            variant='outline'
            className="">
            <Search className=" size-4 " />
          </Button>
        </div>
        <div className='flex items-center gap-4'>



          {
            token ?
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant='outline' size='sm' className='flex items-center gap-2 bg-primary dark:bg-primary text-background' >
                  <div className=' h-10 w-10 flex items-center justify-center rounded-full bg-amber-500 border-5 border-background  flex-shrink-0'>
                    <img src={myAvatar} alt="Notion Avatar" />
                  </div>
                  <span className='text-xs'>{user?.decoded.name}</span>

                </Button>
                }>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Hi {user?.decoded.name}</DropdownMenuLabel>
                    <DropdownMenuItem >
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem> <Link to="/myorders">Orders</Link></DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className='size-5' strokeWidth={1.5} />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent >
              </DropdownMenu>
              : <Link className='hover:text-gray-500  transition-all' to="/login">
                <CircleUserRound className='size-6' strokeWidth={1.5} />
              </Link>
          }
          <NavigationMenu className='hidden sm:flex flex-1 lg:gap-18 md:gap-10 gap-8 '>
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={
                    <Button className='duration-700 hover:text-gray-500 relative px-2' variant='ghost' size='icon'
                      onClick={() => setOpen(true)}>
                      <ShoppingCartIcon className='size-6' strokeWidth={1.5} />
                      {
                        cartItems > 0 &&
                        <Badge className="absolute bottom-0 left-0 bg-primary text-secondary text-xs h-4 w-4 animate-bounce" variant="" size="sm">{cartItems}</Badge>
                      }

                    </Button>
                  }
                ></NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  variant="ghost" className="duration-300 hover:bg-primary hover:text-primary-foreground 
                  dark:hover:bg-primary dark:hover:text-primary-foreground">
                  {theme === 'light' ? <SunIcon className='size-6' strokeWidth={1.5} /> :
                    <MoonIcon className='size-6' strokeWidth={1.5} />}

                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div >
      <div className='transition-all md:hidden'>
        <MobileNav></MobileNav>
      </div>
    </>
  )
}

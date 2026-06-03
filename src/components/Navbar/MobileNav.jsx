import React, { useContext, useState } from 'react'
import { LogOut, CircleUserRound, Menu, ShoppingCartIcon, Store, SunIcon, MoonIcon } from 'lucide-react';
import { Link } from 'react-router-dom'
import { ThemeProviderContext } from '@/components/ui/theme';
import { Switch } from '@/components/ui/switch';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '@/Context/CartContext';
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { useVerify } from '@/hooks/useVerify';


export default function MobileNav() {
    const { cartProducts, addToCartHandler, setOpen } = useContext(CartContext)
    const { data: user } = useVerify()
    const [navOpen, setNavOpen] = useState(false);
    const ThemeContext = useContext(ThemeProviderContext);
    const { theme, setTheme } = ThemeContext;
    const { token, login, logout } = useContext(AuthContext);
    const cartItems = cartProducts?.length
    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-2">
                <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-xl h-16 px-6 flex items-center justify-between text-primary shadow-lg">

                    <Link to="/home" className="transition-all hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                    </Link>

                    <Link to="/shop" className="transition-all hover:scale-110">
                        <Store className="size-6" strokeWidth={1.5} />
                    </Link>

                    {token ?
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant='outline' size='icon' className='flex items-center gap-2 text-background hover:scale-110 transition-all' >
                                <div className=' h-10 w-10 flex items-center justify-center rounded-full bg-amber-500 border-5 border-background  flex-shrink-0'>
                                    <img src="https://notion-avatars.netlify.app/api/avatar/?face=8&nose=3&mouth=17&eyes=4&eyebrows=1&glasses=1&hair=2&accessories=0&details=0&beard=0&halloween=0&christmas=0" alt="Notion Avatar" />
                                </div>
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

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:scale-110 hover:bg-transparent hover:text-primary"
                        onClick={() => setOpen(true)}
                    >
                        <ShoppingCartIcon className="size-6" strokeWidth={1.5} />

                        {cartItems > 0 && (
                            <Badge className="absolute top-0 -right-1 h-5 min-w-5 rounded-full text-xs p-0 animate-bounce ">
                                {cartItems}
                            </Badge>
                        )}
                    </Button>

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="transition-all hover:scale-110 hover:bg-transparent hover:text-primary"
                    >
                        {theme === "light" ? (
                            <SunIcon className="size-6" strokeWidth={1.5} />
                        ) : (
                            <MoonIcon className="size-6" strokeWidth={1.5} />
                        )}
                    </Button>
                </div>
            </div>
        </>
    )
}

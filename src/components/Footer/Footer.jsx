import { ThemeProviderContext } from '@/components/ui/theme';
import { Link } from 'react-router-dom'
import BlackLogo from '@/assets/logoB.png'
import WhiteLogo from '@/assets/logoW.png'
import { useContext } from 'react';

export default function Footer() {
    const ThemeContext = useContext(ThemeProviderContext);
    const { theme } = ThemeContext;

    return (
        <footer className="flex items-center justify-between border-t bg-background px-6 py-4">
            <Link className="flex items-center gap-2" to="/">
                <div className='w-16'>
                    <img src={theme === 'dark' ? WhiteLogo : BlackLogo} alt="logo" />
                </div>
            </Link>

            <p className="font-medium text-muted-foreground text-sm">
                Copyright &copy; {new Date().getFullYear()}
                <Link to="https://mostaql.com/u/hisham_kamell">
                    HishamDev.
                </Link>  All rights
                reserved.
            </p>
        </footer>
    )
}

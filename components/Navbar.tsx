import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'SERVICES', href: '/services' },
    { name: 'PORTFOLIO', href: '/portfolio' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled || !isHome ? 'bg-background/90 backdrop-blur-md border-border py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary flex items-center justify-center transition-transform group-hover:rotate-90">
            <span className="text-white font-bold text-lg">Y</span>
          </div>
          <span className="text-xl font-bold tracking-tighter font-serif italic">YOUNG FUTURE TECH</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-[10px] font-bold tracking-[0.2em] transition-colors hover:text-primary ${location.pathname === link.href ? 'text-primary' : 'text-foreground/70'}`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="outline" className="text-[10px] font-bold tracking-[0.2em] px-8 h-10 border-2 border-foreground hover:bg-foreground hover:text-background transition-all">
            <Link to="/contact">START PROJECT</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-l border-border p-10">
            <div className="flex flex-col gap-8 mt-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`text-3xl font-serif italic hover:text-primary transition-colors ${location.pathname === link.href ? 'text-primary' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="mt-10 h-14 text-lg font-bold">
                <Link to="/contact">START PROJECT</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;

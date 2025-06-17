import { AlignJustify, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface EventHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function EventHeader({ mobileMenuOpen, setMobileMenuOpen }: EventHeaderProps) {
  return (
    <header className="px-4 py-5 lg:px-8">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="text-2xl font-semibold text-black">present</span>
        </div>

        <div className="flex items-center scale-90 gap-4">
          <Link to={'/check-in'} className="px-5 py-1.5 border border-gray-400 rounded-lg md:block hidden">
            Check-In
          </Link>
          <Link 
            to={'/'} 
            className="px-5 py-1.5 bg-transparent border border-gray-400 text-black rounded-lg md:block hidden hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
          >
            Dashboard
          </Link>
          <button
            className="rounded-lg p-1.5 border border-gray-400 md:hidden block relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 cursor-pointer">
              <AlignJustify
                className={cn(
                  "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                  mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
                )} 
              />
              <X 
                className={cn(
                  "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                  mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
                )} 
              />
            </div>
          </button>
          <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
        </div>
      </div>
    </header>
  );
}
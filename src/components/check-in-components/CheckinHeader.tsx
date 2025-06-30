import { AlignJustify, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { useState } from "react"
import { Link } from "react-router-dom"

export function CheckinHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    return (
        <> <div className="flex flex-wrap items-center justify-between p-4 gap-y-4">
            <div className="flex items-center gap-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="font-extrabold text-3xl text-zinc-800">present</span>
        </div>

            <div className="flex items-center gap-4">
                <Link to={'/login'} className="w-full px-5 py-2 border border-gray-400 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors lg:block hidden">
                    Log-in
                </Link>
                <Link to={'/create'} className="w-full px-5 py-2 bg-black text-white rounded-lg text-center font-medium hover:bg-zinc-800  transition ease-in delay-100 duration-150 cursor-pointer lg:block hidden">
                    Create
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
                            )} />
                        <X className={cn(
                            "w-5 h-5 absolute transition-all duration-300 ease-in-out",
                            mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",)} />
                    </div>
                </button>
            </div>
        </div>

            <style>{`
        [data-state="open"][data-radix-collection-item] {
          animation: slideDownAndFade 0.3s ease-out;
        }
        
        @keyframes slideDownAndFade {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>


            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DialogContent className="sm:max-w-md w-[95vw] p-0 m-0 fixed top-4 left-1/2 transform -translate-x-1/2 translate-y-0">
                    <DialogHeader className="p-4 pb-0">
                        <div className="flex justify-end items-center">

                            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700 p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </DialogHeader>

                    <div className="flex flex-col justify-center items-center p-4 space-y-3">
                        <Link to={'/login'}
                            className="w-full px-5 py-3 border border-gray-400 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                        >
                            Log-in
                        </Link>
                        <Link to={'/create'}
                            className="w-full px-5 py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
                        >
                            Create
                        </Link>
                    </div>
                </DialogContent>
            </Dialog>
        </>


    )
}

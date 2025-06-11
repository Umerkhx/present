import { AlignJustify} from 'lucide-react'
import '../App.css'
import { useState } from 'react';

import ModalSystem from '../components/modal-components/modal-system';

function Dashboard() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  

    return (
        <section className='max-w-screen mx-auto '>
            <div className="gradient-bar flex flex-wrap items-center justify-between py-16 px-10 gap-y-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" width={25} height={25} alt="logo" />
                    <span className="font-semibold text-3xl text-zinc-800">Present</span>
                </div>


                <div className="flex items-center gap-4">
                    <div className="px-5 py-1.5 bg-zinc-100 text-black border border-gray-400 rounded-lg md:block hidden">
                        Check-In
                    </div>
                    <button onClick={() => { setDialogOpen(true) }} className="px-6 py-1.5 bg-zinc-950 text-zinc-50 rounded-lg md:block hidden cursor-pointer hover:bg-zinc-800 transition-colors duration-300">
                        Create
                    </button>
                    <div className="rounded-lg p-1.5 border border-gray-400 md:hidden block">
                        <AlignJustify className="w-5 h-5" />
                    </div>
                    <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
                </div>
            </div>


       <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />

        

            <div className='p-10'>
                <h1 className='text-3xl font-semibold text-zinc-900'>Welcome Back, Matteo</h1>
                <div className="flex items-center my-8 gap-3">
                    <div className="px-5 py-1.5 bg-transparent text-black  border border-gray-900 rounded-lg ">
                        My Events
                    </div>
                    <div className="px-6 py-1.5 bg-transparent text-black border border-gray-400 rounded-lg ">
                        My Groups
                    </div>
                </div>
                <h2 className='text-xl font-semibold text-zinc-900'>Previous Events</h2>
                <div className='rounded-lg outline-1 outline-black w-full h-64 my-7 flex flex-col'>
                    <div className='flex-grow flex justify-center flex-col  items-center'>
                        <p className='font-semibold text-xl text-black'>No Events Yet.  </p>
                        <p className='text-center font-semibold text-lg'>Create an Event here </p>
                    </div>
                </div>
                <h2 className='text-xl font-semibold text-zinc-900'>Upcoming Events</h2>
            </div>
        </section>
    )
}

export default Dashboard
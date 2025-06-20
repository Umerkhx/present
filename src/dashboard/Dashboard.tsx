import { AlignJustify, X } from 'lucide-react';
import '../App.css';
import { useState } from 'react';
import ModalSystem from '../components/modal-components/modal-system';
import { Dialog, DialogContent, DialogHeader } from '../components/ui/dialog';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

type EventCardProps = {
    title: string;
    date: string;
    by: string;
    checkIns: string;
};

const EventCard = ({ title, date, by, checkIns }: EventCardProps) => (
    <div className="rounded-lg outline-1 outline-gray-300 lg:h-[250px] p-3 my-5 flex flex-col">
        <p className="font-semibold md:text-xl text-lg text-black">{title}</p>
        <p className="font-medium text-sm pt-3">{date}</p>
        <p className="font-medium text-sm">By: {by}</p>
        <div className="flex flex-col flex-grow justify-end pt-5 lg:pt-0">
            <div className="border border-t w-full border-gray-50"></div>
            <div className="flex items-start gap-4 pt-3 pb-1">
                <div>
                    <img className="w-8 h-6" src="/Attendees Icon.png" alt="attendees" />
                </div>
                <div className="flex justify-between items-center w-full">
                    <div>{checkIns}</div>
                    <div>
                        <img src="/Icon.png" alt="icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const previousEvents = [
    {
        title: '5th Period English 5/9/2025',
        date: 'May 9,2025',
        by: 'Matteo Zamboni',
        checkIns: '1 Check-In',
    },
    {
        title: '2nd Period Music (24)',
        date: 'May 8, 2025',
        by: 'Matteo Zamboni',
        checkIns: '32 Check-ins',
    },
    {
        title: 'MATH 450 Lecture 12/Field Trip Section B - 2024/2025',
        date: 'Apr 21, 2025',
        by: 'Matteo Zamboni',
        checkIns: '123 Check-ins',
    },
    {
        title: 'Texas McCombs Alumni Meeting',
        date: 'Jan 10, 2025',
        by: 'Matteo Zamboni',
        checkIns: '73 Check-ins',
    },
];

const upcomingEvents = [
    {
        title: 'Texas McCombs Alumni Mixer',
        date: 'May 21, 2025',
        by: 'Matteo Zamboni',
        checkIns: '0 Check-In',
    },
    {
        title: '4th Period Art Class (24/25)',
        date: 'May 30, 2025',
        by: 'Matteo Zamboni',
        checkIns: '0 Check-in',
    },
    {
        title: 'Dallas Rowing Club Youth Summer Camp Week 1',
        date: 'June 21, 2025',
        by: 'Matteo Zamboni',
        checkIns: '0 Check-in',
    },
];

function Dashboard() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="container mx-auto">
            {/* Header */}
            <div className="gradient-bar flex flex-wrap items-center justify-between py-16 px-10 gap-y-4">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" width={25} height={25} alt="logo" />
                    <span className="font-semibold text-3xl text-zinc-800">Present</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/check-in"
                        className="px-5 py-2 border border-gray-400 rounded-lg md:block hidden"
                    >
                        Check-In
                    </Link>
                    <Link
                        to="/create"
                        className="px-5 py-2 bg-black text-white rounded-lg md:block hidden hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-150 duration-150 cursor-pointer"
                    >
                        Create
                    </Link>
                    <button
                        className="rounded-lg p-1.5 border border-gray-400 md:hidden block relative z-50"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-5 h-5 cursor-pointer">
                            <AlignJustify
                                className={cn(
                                    'w-5 h-5 absolute transition-all duration-300 ease-in-out',
                                    mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                )}
                            />
                            <X
                                className={cn(
                                    'w-5 h-5 absolute transition-all duration-300 ease-in-out',
                                    mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                                )}
                            />
                        </div>
                    </button>
                    <button className="cursor-pointer" onClick={() => setDialogOpen(true)}>
                        <img className="rounded-full w-10 h-10 object-cover" src="/profile.png" alt="profile" />
                    </button>
                </div>
            </div>

            {/* Modal System */}
            <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />

            {/* Main Content */}
            <div className="p-10">
                <h1 className="text-3xl font-semibold text-zinc-900">Welcome Back, Matteo</h1>
                <div className="flex items-center my-8 gap-3">
                    <div className="px-5 py-1.5 bg-transparent text-black border border-gray-900 rounded-lg">
                        My Events
                    </div>
                    <div className="px-6 py-1.5 bg-transparent text-black border border-gray-400 rounded-lg">
                        My Groups
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-zinc-900">Previous Events</h2>
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 px-4">
                    {previousEvents.map((event, idx) => (
                        <EventCard key={idx} {...event} />
                    ))}
                </div>
                <h2 className="text-xl font-semibold text-zinc-900">Upcoming Events</h2>
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 px-4">
                    {upcomingEvents.map((event, idx) => (
                        <EventCard key={idx} {...event} />
                    ))}
                </div>
            </div>

            {/* Mobile Menu Animation */}
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

            {/* Mobile Menu Dialog */}
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DialogContent className="sm:max-w-md w-[95vw] p-0 m-0 fixed top-4 left-1/2 transform -translate-x-1/2 translate-y-0">
                    <DialogHeader className="p-4 pb-0">
                        <div className="flex justify-end items-center">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </DialogHeader>
                    <div className="p-4 space-y-3 flex flex-col items-center">
                        <Link
                            to="/check-in"
                            className="w-full px-5 py-3 border border-gray-400 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                        >
                            Check-In
                        </Link>
                        <button
                            className="w-full px-5 py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
                            onClick={() => setDialogOpen(true)}
                        >
                            Create
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}

export default Dashboard;

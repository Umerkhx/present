import { AlignJustify, Plus, X } from 'lucide-react';
import '../App.css';
import { useState } from 'react';
import ModalSystem from '../components/modal-components/modal-system';
import { Dialog, DialogContent, DialogHeader } from '../components/ui/dialog';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Pencil, Cloud } from 'lucide-react';



type CardProps = {
    title: string;
    date: string;
    by: string;
    checkIns: string;
};

const EventCard = ({ title, date, by, checkIns }: CardProps) => (
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

const GroupCard = ({ title, date, by, checkIns }: CardProps) => (


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

const groupData = [
    {
        groupName: 'AP English (2nd Period 24-25)',
        icon: [<Pencil className="w-5 h-5 mr-2 text-gray-600" />,<Cloud className="w-5 h-5 mr-2 text-gray-600" />],
        events: [
            {
                title: 'AP English 2nd Period 3/20/25',
                date: 'Mar 20, 2025',
                by: 'Penny Smith',
                checkIns: '18 Check-Ins',
            },
            {
                title: 'AP English 2nd Period 4/10/25',
                date: 'Apr 10, 2025',
                by: 'Penny Smith',
                checkIns: '22 Check-Ins',
            },
            {
                title: 'AP English 2nd Period 5/1/25',
                date: 'May 1, 2025',
                by: 'Penny Smith',
                checkIns: '20 Check-Ins',
            },
            {
                title: 'AP English 2nd Period 5/15/25',
                date: 'May 15, 2025',
                by: 'Penny Smith',
                checkIns: '19 Check-Ins',
            },
        ],
    },
    {
        groupName: 'Freshman English (4th Period 24-25)',
        icon: [<Pencil className="w-5 h-5 mr-2 text-gray-600" />,<Cloud className="w-5 h-5 mr-2 text-gray-600" />],
        events: [
            {
                title: 'Freshman English 4th Period 3/20/25',
                date: 'Mar 20, 2025',
                by: 'Penny Smith',
                checkIns: '18 Check-Ins',
            },
            {
                title: 'Freshman English 4th Period 4/12/25',
                date: 'Apr 12, 2025',
                by: 'Penny Smith',
                checkIns: '21 Check-Ins',
            },
            {
                title: 'Freshman English 4th Period 5/2/25',
                date: 'May 2, 2025',
                by: 'Penny Smith',
                checkIns: '17 Check-Ins',
            },
            {
                title: 'Freshman English 4th Period 5/16/25',
                date: 'May 16, 2025',
                by: 'Penny Smith',
                checkIns: '20 Check-Ins',
            },
        ],
    },
];

function Dashboard() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'events' | 'groups'>('events');

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
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`px-5 py-1.5 rounded-lg border ${activeTab === 'events' ? 'border-gray-900 bg-gray-100' : 'border-gray-400'}`}
                    >
                        My Events
                    </button>
                    <button
                        onClick={() => setActiveTab('groups')}
                        className={`px-6 py-1.5 rounded-lg border ${activeTab === 'groups' ? 'border-gray-900 bg-gray-100' : 'border-gray-400'}`}
                    >
                        My Groups
                    </button>
                </div>

                {activeTab === 'events' ? (
                    <>

                        <h2 className="text-xl font-semibold text-zinc-900 mt-8">Previous Events</h2>
                        {previousEvents.length === 0 ? (
                            <div className='w-full border border-gray-400 h-52 rounded-xl mt-5'>
                                <div className='mt-16 text-zinc-900 font-semibold text-center text-xl'>No Previous Events Yet.</div>
                                <div className='text-zinc-900 font-semibold pt-1 text-center'>Create an event here</div>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 px-4">
                                {previousEvents.map((event, idx) => (
                                    <EventCard key={idx} {...event} />
                                ))}
                            </div>
                        )}


                        <h2 className="text-xl font-semibold text-zinc-900">Upcoming Events</h2>
                        {upcomingEvents.length === 0 ? (
                            <div className='w-full border border-gray-400 h-52 rounded-xl mt-5'>
                                <div className='mt-16 text-zinc-900 font-semibold text-center text-xl'>No Upcoming Events Yet.</div>
                                <div className='text-zinc-900 font-semibold pt-1 text-center'>Create an event here</div>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 px-4">
                                {upcomingEvents.map((event, idx) => (
                                    <EventCard key={idx} {...event} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl px-4 font-semibold text-zinc-900 flex gap-2 mb-5">You have created 2/5 Groups <Plus className='text-gray-300'/></h2>
                        {groupData.length === 0 ? (
                            <div className='w-full border border-gray-400 h-52 rounded-xl mt-5'>
                                <div className='mt-16 text-zinc-900 font-semibold text-center text-xl'>No Groups Yet.</div>
                                <div className='text-zinc-900 font-semibold pt-1 text-center'>Create a group here</div>
                            </div>
                        ) : (
                            <div className="px-4 space-y-5">
                                {groupData.map((group, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-2xl font-semibold text-zinc-800 mb-3 gap-2.5 flex items-center">
                                            {group.groupName}
                                            {group.icon}
                                        </h3>
                                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                                            {group.events.map((event, eventIdx) => (
                                                <GroupCard
                                                    key={eventIdx}
                                                    title={event.title}
                                                    date={event.date}
                                                    by={event.by}
                                                    checkIns={event.checkIns}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
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
"use client"

import { AlignJustify, Plus, X, Pencil, Cloud, ChevronRight } from "lucide-react"
import { useState, useMemo } from "react"
import ModalSystem from "../components/modal-components/modal-system"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { useAppContext } from "../context/app-context"
import EventCardMenu from "../components/group-export-dialog/event-menu"
import ExportDialog from "../components/group-export-dialog/export-dialog"
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel"

type CardProps = {
  id: string
  title: string
  date: string
  by: string
  checkIns: string
  groupName?: string
}

const EventCard = ({ id, title, date, by, checkIns }: CardProps & { groupId?: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEditClick = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-lg border border-gray-300 md:h-[250px] h-[260px] p-3 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="font-bold md:text-xl text-base text-black flex-1 pr-2">{title}</p>
        </div>
        <p className="font-medium text-sm pt-1">{date}</p>
        <p className="font-medium text-sm">By: {by}</p>
        <div className="flex flex-col flex-grow justify-end pt-5">
          <div className="border border-t w-full border-gray-50"></div>
          <div className="flex items-start gap-4 pt-3 pb-1">
            <div>
              <img className="md:w-8 md:h-6 w-6 h-4" src="/Attendees Icon.png" alt="attendees" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="md:text-sm text-xs font-semibold">{checkIns}</div>
              <div className="flex items-center gap-2">
                <EventCardMenu eventId={id} eventTitle={title} isGroupEvent={false} onEditClick={handleEditClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}

const GroupCard = ({ id, title, date, by, checkIns }: CardProps & { groupId?: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEditClick = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-lg border border-gray-300 md:h-[250px] h-[260px] p-3 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="font-bold md:text-xl text-base text-black flex-1 pr-2">{title}</p>
        </div>
        <p className="font-medium text-sm pt-1">{date}</p>
        <p className="font-medium text-sm">By: {by}</p>
        <div className="flex flex-col flex-grow justify-end pt-5">
          <div className="border border-t w-full border-gray-50"></div>
          <div className="flex items-start gap-4 pt-3 pb-1">
            <div>
              <img className="md:w-8 md:h-6 w-6 h-4" src="/Attendees Icon.png" alt="attendees" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="md:text-sm text-xs font-semibold">{checkIns}</div>
              <div className="flex items-center gap-2">
                <EventCardMenu eventId={id} eventTitle={title} isGroupEvent={true} onEditClick={handleEditClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}

const EventsModal = ({
  isOpen,
  onClose,
  events,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  events: CardProps[]
  title: string
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const GroupHistoryModal = ({
  isOpen,
  onClose,
  groupName,
  events,
}: {
  isOpen: boolean
  onClose: () => void
  groupName: string
  events: any[]
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{groupName} - Event History</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4">
          {events.map((event) => (
            <GroupCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              by={event.by}
              checkIns={event.checkIns}
              groupName={groupName}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const groupData = [
  {
    groupName: "AP English (2nd Period 24-25)",
    events: [
      {
        id: "g1-1",
        title: "AP English 2nd Period 5/15/25",
        date: "May 15, 2025",
        by: "Penny Smith",
        checkIns: "19 Check-Ins",
        dateObj: new Date("2025-05-15"),
      },
      {
        id: "g1-2",
        title: "AP English 2nd Period 5/1/25",
        date: "May 1, 2025",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2025-05-01"),
      },
      {
        id: "g1-3",
        title: "AP English 2nd Period 4/10/25",
        date: "Apr 10, 2025",
        by: "Penny Smith",
        checkIns: "22 Check-Ins",
        dateObj: new Date("2025-04-10"),
      },
      {
        id: "g1-4",
        title: "AP English 2nd Period 3/20/25",
        date: "Mar 20, 2025",
        by: "Penny Smith",
        checkIns: "18 Check-Ins",
        dateObj: new Date("2025-03-20"),
      },
      {
        id: "g1-5",
        title: "AP English 2nd Period 2/28/25",
        date: "Feb 28, 2025",
        by: "Penny Smith",
        checkIns: "21 Check-Ins",
        dateObj: new Date("2025-02-28"),
      },
      {
        id: "g1-6",
        title: "AP English 2nd Period 2/14/25",
        date: "Feb 14, 2025",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2025-02-14"),
      },
      {
        id: "g1-7",
        title: "AP English 2nd Period 1/30/25",
        date: "Jan 30, 2025",
        by: "Penny Smith",
        checkIns: "19 Check-Ins",
        dateObj: new Date("2025-01-30"),
      },
      {
        id: "g1-8",
        title: "AP English 2nd Period 1/15/25",
        date: "Jan 15, 2025",
        by: "Penny Smith",
        checkIns: "22 Check-Ins",
        dateObj: new Date("2025-01-15"),
      },
      {
        id: "g1-9",
        title: "AP English 2nd Period 12/20/24",
        date: "Dec 20, 2024",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2024-12-20"),
      },
      {
        id: "g1-10",
        title: "AP English 2nd Period 12/5/24",
        date: "Dec 5, 2024",
        by: "Penny Smith",
        checkIns: "21 Check-Ins",
        dateObj: new Date("2024-12-05"),
      },
      {
        id: "g1-11",
        title: "AP English 2nd Period 11/18/24",
        date: "Nov 18, 2024",
        by: "Penny Smith",
        checkIns: "18 Check-Ins",
        dateObj: new Date("2024-11-18"),
      },
      {
        id: "g1-12",
        title: "AP English 2nd Period 11/1/24",
        date: "Nov 1, 2024",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2024-11-01"),
      },
      {
        id: "g1-13",
        title: "AP English 2nd Period 10/15/24",
        date: "Oct 15, 2024",
        by: "Penny Smith",
        checkIns: "19 Check-Ins",
        dateObj: new Date("2024-10-15"),
      },
      {
        id: "g1-14",
        title: "AP English 2nd Period 10/1/24",
        date: "Oct 1, 2024",
        by: "Penny Smith",
        checkIns: "21 Check-Ins",
        dateObj: new Date("2024-10-01"),
      },
      {
        id: "g1-15",
        title: "AP English 2nd Period 9/15/24",
        date: "Sep 15, 2024",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2024-09-15"),
      },
      {
        id: "g1-16",
        title: "AP English 2nd Period 9/1/24",
        date: "Sep 1, 2024",
        by: "Penny Smith",
        checkIns: "22 Check-Ins",
        dateObj: new Date("2024-09-01"),
      },
      {
        id: "g1-17",
        title: "AP English 2nd Period 9/1/24",
        date: "Sep 1, 2024",
        by: "Penny Smith",
        checkIns: "22 Check-Ins",
        dateObj: new Date("2024-09-01"),
      },
    ],
  },
  {
    groupName: "Freshman English (4th Period 24-25)",
    events: [
      {
        id: "g2-1",
        title: "Freshman English 4th Period 5/16/25",
        date: "May 16, 2025",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2025-05-16"),
      },
      {
        id: "g2-2",
        title: "Freshman English 4th Period 5/2/25",
        date: "May 2, 2025",
        by: "Penny Smith",
        checkIns: "17 Check-Ins",
        dateObj: new Date("2025-05-02"),
      },
      {
        id: "g2-3",
        title: "Freshman English 4th Period 4/12/25",
        date: "Apr 12, 2025",
        by: "Penny Smith",
        checkIns: "21 Check-Ins",
        dateObj: new Date("2025-04-12"),
      },
      {
        id: "g2-4",
        title: "Freshman English 4th Period 3/20/25",
        date: "Mar 20, 2025",
        by: "Penny Smith",
        checkIns: "18 Check-Ins",
        dateObj: new Date("2025-03-20"),
      },
      {
        id: "g2-5",
        title: "Freshman English 4th Period 2/28/25",
        date: "Feb 28, 2025",
        by: "Penny Smith",
        checkIns: "19 Check-Ins",
        dateObj: new Date("2025-02-28"),
      },
      {
        id: "g2-6",
        title: "Freshman English 4th Period 2/14/25",
        date: "Feb 14, 2025",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2025-02-14"),
      },
      {
        id: "g2-7",
        title: "Freshman English 4th Period 1/30/25",
        date: "Jan 30, 2025",
        by: "Penny Smith",
        checkIns: "18 Check-Ins",
        dateObj: new Date("2025-01-30"),
      },
      {
        id: "g2-8",
        title: "Freshman English 4th Period 1/15/25",
        date: "Jan 15, 2025",
        by: "Penny Smith",
        checkIns: "21 Check-Ins",
        dateObj: new Date("2025-01-15"),
      },
      {
        id: "g2-9",
        title: "Freshman English 4th Period 12/20/24",
        date: "Dec 20, 2024",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2024-12-20"),
      },
      {
        id: "g2-10",
        title: "Freshman English 4th Period 12/5/24",
        date: "Dec 5, 2024",
        by: "Penny Smith",
        checkIns: "19 Check-Ins",
        dateObj: new Date("2024-12-05"),
      },
      {
        id: "g2-11",
        title: "Freshman English 4th Period 11/18/24",
        date: "Nov 18, 2024",
        by: "Penny Smith",
        checkIns: "18 Check-Ins",
        dateObj: new Date("2024-11-18"),
      },
      {
        id: "g2-12",
        title: "Freshman English 4th Period 11/1/24",
        date: "Nov 1, 2024",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2024-11-01"),
      },
      {
        id: "g2-13",
        title: "Freshman English 4th Period 10/15/24",
        date: "Oct 15, 2024",
        by: "Penny Smith",
        checkIns: "19 Check-Ins",
        dateObj: new Date("2024-10-15"),
      },
      {
        id: "g2-14",
        title: "Freshman English 4th Period 10/1/24",
        date: "Oct 1, 2024",
        by: "Penny Smith",
        checkIns: "21 Check-Ins",
        dateObj: new Date("2024-10-01"),
      },
      {
        id: "g2-15",
        title: "Freshman English 4th Period 9/15/24",
        date: "Sep 15, 2024",
        by: "Penny Smith",
        checkIns: "20 Check-Ins",
        dateObj: new Date("2024-09-15"),
      },
      {
        id: "g2-16",
        title: "Freshman English 4th Period 9/1/24",
        date: "Sep 1, 2024",
        by: "Penny Smith",
        checkIns: "22 Check-Ins",
        dateObj: new Date("2024-09-01"),
      },
    ],
  },
]

function Dashboard() {
  const {
    user,
    previousEvents,
    upcomingEvents,
    createdGroups,
    groupsUsageText,
    currentPlan,
    setExportDialogOpen,
    setExportingGroupName,
  } = useAppContext()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"events" | "groups">("events")

  const [previousEventsModalOpen, setPreviousEventsModalOpen] = useState(false)
  const [upcomingEventsModalOpen, setUpcomingEventsModalOpen] = useState(false)
  const [groupHistoryModalOpen, setGroupHistoryModalOpen] = useState(false)
  const [selectedGroupHistory, setSelectedGroupHistory] = useState<{ name: string; events: any[] }>({
    name: "",
    events: [],
  })

  // Sort events by date
  const sortedPreviousEvents = useMemo(() => {
    return [...previousEvents].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA // Most recent first
    })
  }, [previousEvents])

  const sortedUpcomingEvents = useMemo(() => {
    return [...upcomingEvents].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateA - dateB // Soonest first
    })
  }, [upcomingEvents])

  const handleExportGroup = (groupName: string) => {
    setExportingGroupName(groupName)
    setExportDialogOpen(true)
  }

  const handleEditGroupModal = () => {
    setDialogOpen(true)
  }

  const handleShowMorePreviousEvents = () => {
    setPreviousEventsModalOpen(true)
  }

  const handleShowMoreUpcomingEvents = () => {
    setUpcomingEventsModalOpen(true)
  }

  const handleShowGroupHistory = (groupName: string, events: any[]) => {
    setSelectedGroupHistory({ name: groupName, events })
    setGroupHistoryModalOpen(true)
  }

  return (
    <section className="mx-auto">
      {/* Header */}
      <div className="gradient-bar flex flex-wrap items-center justify-between py-16 px-10 gap-y-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="font-extrabold text-3xl text-zinc-800">present</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/check-in" className="px-5 py-2 border font-medium border-gray-400 rounded-lg md:block hidden">
            Check-In
          </Link>
          <Link
            to="/create"
            className="px-5 py-2 bg-black text-white rounded-lg md:block hidden hover:bg-zinc-700 transition ease-in delay-150 duration-150 cursor-pointer"
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
          <button className="cursor-pointer" onClick={() => setDialogOpen(true)}>
            <img
              className="rounded-full w-10 h-10 object-cover"
              src={user.profileImage || "/placeholder.svg"}
              alt="profile"
            />
          </button>
        </div>
      </div>

      <ModalSystem open={dialogOpen} setOpen={setDialogOpen} />
      <ExportDialog />

      <div className="p-10">
        <h1 className="text-3xl font-bold text-zinc-900">Welcome Back, {user.firstName}</h1>

        <div className="flex items-center my-8 gap-3">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-5 py-1.5 font-medium rounded-lg border ${activeTab === "events" ? "border-gray-900 bg-gray-100" : "border-gray-400"}`}
          >
            My Events
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-6 py-1.5 font-medium rounded-lg border ${activeTab === "groups" ? "border-gray-900 bg-gray-100" : "border-gray-400"}`}
          >
            My Groups
          </button>
        </div>

        {activeTab === "events" ? (
          <>
            {/* Previous Events Section */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-zinc-900">Previous Events</h2>
              {sortedPreviousEvents.length > 16 && (
                <Button
                  variant="outline"
                  onClick={handleShowMorePreviousEvents}
                  className="flex items-center gap-2 bg-transparent"
                >
                  See More <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>

            {sortedPreviousEvents.length === 0 ? (
              <div className="w-full border border-gray-400 h-52 rounded-xl mt-5">
                <div className="mt-16 text-zinc-900 font-bold text-center text-xl">No Previous Events Yet.</div>
                <div className="text-zinc-900 font-bold pt-1 text-center">Create an event here</div>
              </div>
            ) : (
              <div className="mt-5">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {sortedPreviousEvents.slice(0, 16).map((event) => (
                      <CarouselItem
                        key={event.id}
                        className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                      >
                        <EventCard {...event} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}

            {/* Upcoming Events Section */}
            <div className="flex items-center justify-between mb-5 mt-8">
              <h2 className="text-xl font-bold text-zinc-900">Upcoming Events</h2>
              {sortedUpcomingEvents.length > 16 && (
                <Button
                  variant="outline"
                  onClick={handleShowMoreUpcomingEvents}
                  className="flex items-center gap-2 bg-transparent"
                >
                  See More <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>

            {sortedUpcomingEvents.length === 0 ? (
              <div className="w-full border border-gray-400 h-52 rounded-xl mt-5">
                <div className="mt-16 text-zinc-900 font-bold text-center text-xl">No Upcoming Events Yet.</div>
                <div className="text-zinc-900 font-bold pt-1 text-center">Create an event here</div>
              </div>
            ) : (
              <div className="mt-5">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {sortedUpcomingEvents.slice(0, 16).map((event) => (
                      <CarouselItem
                        key={event.id}
                        className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                      >
                        <EventCard {...event} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div className="md:text-2xl text-xl md:px-4 font-bold text-zinc-900 flex gap-2">
                {groupsUsageText}
                <button className="cursor-pointer" onClick={() => setDialogOpen(true)}>
                  <Plus className="text-gray-300 hover:text-gray-600" />
                </button>
              </div>
            </div>

            {createdGroups.length === 0 ? (
              <div className="w-full border border-gray-400 h-52 rounded-xl mt-5">
                <div className="mt-16 text-zinc-900 font-bold text-center text-xl">No Groups Yet.</div>
                <div className="text-zinc-900 font-bold pt-1 text-center">Create a group here</div>
              </div>
            ) : (
              <div className="lg:px-4 md:space-y-8 space-y-6">
                {(currentPlan === "free"
                  ? groupData.slice(0, Math.min(1, createdGroups.length))
                  : groupData.slice(0, createdGroups.length)
                ).map((group, idx) => {
                  const sortedGroupEvents = [...group.events].sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
                  const groupName = createdGroups[idx]?.name || group.groupName
                  const groupId = createdGroups[idx]?.id || group.groupName

                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="md:text-2xl text-base font-bold text-zinc-800 gap-2.5 flex items-center">
                          {groupName}
                          <button
                            onClick={handleEditGroupModal}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Pencil className="w-5 h-5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleExportGroup(groupName)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Cloud className="w-5 h-5 text-gray-600" />
                          </button>
                        </h3>

                      </div>

                      <Carousel
                        opts={{
                          align: "start",
                        }}
                        className="w-full"
                      >
                        <CarouselContent className="-ml-2 md:-ml-4">
                          {sortedGroupEvents.slice(0, 16).map((event) => (
                            <CarouselItem
                              key={event.id}
                              className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                            >
                              <GroupCard
                                id={event.id}
                                title={event.title}
                                date={event.date}
                                by={event.by}
                                checkIns={event.checkIns}
                                groupName={groupName}
                                groupId={groupId}
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>

                      <div className="flex justify-center items-center">
                        {sortedGroupEvents.length > 16 && (
                          <Button
                            variant="outline"
                            onClick={() => handleShowGroupHistory(groupName, sortedGroupEvents)}
                            className="flex  mt-5 items-center gap-2 "
                          >
                            See More <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

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
            <Link
              to={"/create"}
              className="w-full px-5 py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
            >
              Create
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      <EventsModal
        isOpen={previousEventsModalOpen}
        onClose={() => setPreviousEventsModalOpen(false)}
        events={sortedPreviousEvents}
        title="All Previous Events"
      />

      <EventsModal
        isOpen={upcomingEventsModalOpen}
        onClose={() => setUpcomingEventsModalOpen(false)}
        events={sortedUpcomingEvents}
        title="All Upcoming Events"
      />

      <GroupHistoryModal
        isOpen={groupHistoryModalOpen}
        onClose={() => setGroupHistoryModalOpen(false)}
        groupName={selectedGroupHistory.name}
        events={selectedGroupHistory.events}
      />
    </section>
  )
}

export default Dashboard

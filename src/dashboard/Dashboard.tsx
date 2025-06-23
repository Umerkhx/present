"use client"

import { AlignJustify, Plus, X, Pencil, Cloud } from "lucide-react"
import "../App.css"
import { useState, useMemo } from "react"
import ModalSystem from "../components/modal-components/modal-system"
import { Dialog, DialogContent, DialogHeader } from "../components/ui/dialog"
import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { useAppContext } from "../context/app-context"
import EventCardMenu from "../components/group-export-dialog/event-menu"
import ExportDialog from "../components/group-export-dialog/export-dialog"

type CardProps = {
  id: string
  title: string
  date: string
  by: string
  checkIns: string
  groupName?: string
}

const EventCard = ({ id, title, date, by, checkIns }: CardProps & { groupId?: string }) => (
  <div className="rounded-lg border border-gray-300 lg:h-[250px] p-3 my-5 flex flex-col ">
    <div className="flex justify-between items-start mb-2">
      <p className="font-semibold md:text-xl text-lg text-black flex-1 pr-2">{title}</p>
    </div>
    <p className="font-medium text-sm pt-1">{date}</p>
    <p className="font-medium text-sm">By: {by}</p>
    <div className="flex flex-col flex-grow justify-end pt-5 lg:pt-0">
      <div className="border border-t w-full border-gray-50"></div>
      <div className="flex items-start gap-4 pt-3 pb-1">
        <div>
          <img className="w-8 h-6" src="/Attendees Icon.png" alt="attendees" />
        </div>
        <div className="flex justify-between items-center w-full">
          <div>{checkIns}</div>
          <div className="flex items-center gap-2">
            <EventCardMenu eventId={id} eventTitle={title} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const GroupCard = ({ id, title, date, by, checkIns }: CardProps & { groupId?: string }) => (
  <div className="rounded-lg border border-gray-300 lg:h-[250px] p-3 my-5 flex flex-col ">
    <div className="flex justify-between items-start mb-2">
      <p className="font-semibold md:text-xl text-lg text-black flex-1 pr-2">{title}</p>
    </div>
    <p className="font-medium text-sm pt-1">{date}</p>
    <p className="font-medium text-sm">By: {by}</p>
    <div className="flex flex-col flex-grow justify-end pt-5 lg:pt-0">
      <div className="border border-t w-full border-gray-50"></div>
      <div className="flex items-start gap-4 pt-3 pb-1">
        <div>
          <img className="w-8 h-6" src="/Attendees Icon.png" alt="attendees" />
        </div>
        <div className="flex justify-between items-center w-full">
          <div>{checkIns}</div>
          <div className="flex items-center gap-2">
            <EventCardMenu eventId={id} eventTitle={title} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Sample group events data with previous events only
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
    ],
  },
]

function Dashboard() {
  const {user, previousEvents, upcomingEvents, createdGroups, groupsUsageText, currentPlan, setExportDialogOpen, setExportingGroupName, handleEditGroupModal} = useAppContext()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"events" | "groups">("events")

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

  return (
    <section className="container mx-auto">
      {/* Header */}
      <div className="gradient-bar flex flex-wrap items-center justify-between py-16 px-10 gap-y-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="font-semibold text-3xl text-zinc-800">Present</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/check-in" className="px-5 py-2 border border-gray-400 rounded-lg md:block hidden">
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
        <h1 className="text-3xl font-semibold text-zinc-900">Welcome Back, {user.firstName}</h1>
        <div className="flex items-center my-8 gap-3">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-5 py-1.5 rounded-lg border ${activeTab === "events" ? "border-gray-900 bg-gray-100" : "border-gray-400"}`}
          >
            My Events
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-6 py-1.5 rounded-lg border ${activeTab === "groups" ? "border-gray-900 bg-gray-100" : "border-gray-400"}`}
          >
            My Groups
          </button>
        </div>

        {activeTab === "events" ? (
          <>
            <h2 className="text-xl font-semibold text-zinc-900 mt-8">Previous Events</h2>
            {sortedPreviousEvents.length === 0 ? (
              <div className="w-full border border-gray-400 h-52 rounded-xl mt-5">
                <div className="mt-16 text-zinc-900 font-semibold text-center text-xl">No Previous Events Yet.</div>
                <div className="text-zinc-900 font-semibold pt-1 text-center">Create an event here</div>
              </div>
            ) : (
              <div className="mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-0">
                  {sortedPreviousEvents.map((event) => (
                    <EventCard key={event.id}  {...event} />
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-xl font-semibold text-zinc-900 mt-8">Upcoming Events</h2>
            {sortedUpcomingEvents.length === 0 ? (
              <div className="w-full border border-gray-400 h-52 rounded-xl mt-5">
                <div className="mt-16 text-zinc-900 font-semibold text-center text-xl">No Upcoming Events Yet.</div>
                <div className="text-zinc-900 font-semibold pt-1 text-center">Create an event here</div>
              </div>
            ) : (
              <div className="mt-5">

                <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-0">
                  {sortedUpcomingEvents.map((event) => (
                    <EventCard key={event.id}  {...event} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <div className="md:text-2xl text-xl px-4 font-semibold text-zinc-900 flex gap-2">
                {groupsUsageText}
                <button className="cursor-pointer " onClick={() => setDialogOpen(true)}> <Plus className="text-gray-300 hover:text-gray-600" /> </button>
              </div>
            </div>

            {createdGroups.length === 0 ? (
              <div className="w-full border border-gray-400 h-52 rounded-xl mt-5">
                <div className="mt-16 text-zinc-900 font-semibold text-center text-xl">No Groups Yet.</div>
                <div className="text-zinc-900 font-semibold pt-1 text-center">Create a group here</div>
              </div>
            ) : (
              <div className="lg:px-4 md:space-y-8 space-y-3">
                {(currentPlan === "free"
                  ? groupData.slice(0, Math.min(1, createdGroups.length))
                  : groupData.slice(0, createdGroups.length)
                ).map((group, idx) => {
                  // Sort group events by date (most recent first)
                  const sortedGroupEvents = [...group.events].sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
                  const groupName = createdGroups[idx]?.name || group.groupName
                  const groupId = createdGroups[idx]?.id || group.groupName

                  return (
                    <div key={idx}>
                      <h3 className="md:text-2xl text-lg font-semibold text-zinc-800 mb-3 gap-2.5 flex items-center">
                        {groupName}
                        <button
                          onClick={() => handleEditGroupModal(groupId)}
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
                      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 gap-0 ">
                        {sortedGroupEvents.map((event) => (
                          <GroupCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            by={event.by}
                            checkIns={event.checkIns}
                            groupName={groupName}
                            groupId={groupId}
                          />
                        ))}
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
  )
}

export default Dashboard

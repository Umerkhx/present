"use client"

import { X, Edit2, PencilIcon } from "lucide-react"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { useAppContext } from "../../context/app-context"

export default function Admin() {
  const {
    currentPlan,
    viewMode,
    setViewMode,
    teamName,
    setTeamName,
    isEditingOwner,
    setIsEditingOwner,
    accountOwner,
    admins,
    savedAdmins,
    setSavedAdmins,
    handleTeamSave,
    updateAccountOwner,
    updateAdmin,
    removeAdmin,
  } = useAppContext()

  const hasAdminAccess = currentPlan === "pro"

  const handleSave = () => {
    // Filter completed admins and set default emails/roles
    const completedAdmins = admins
      .filter((admin) => admin.firstName.trim() && admin.lastName.trim())
      .map((admin) => ({
        ...admin,
        email: admin.email || "psmith2000@gmail.com",
        role: admin.role || "Admin",
      }))

    setSavedAdmins(completedAdmins)
    setViewMode("saved")

    // Notify about team save
    handleTeamSave(teamName, {
      firstName: accountOwner.firstName,
      lastName: accountOwner.lastName,
      role: accountOwner.role,
      initials: accountOwner.initials,
      bgColor: accountOwner.bgColor,
      id: "",
      email: ""
    })
  }

  const handleEditTeam = () => {
    setViewMode("edit")
    setIsEditingOwner(false)
  }

  const handleSaveOwnerInfo = () => {
    setIsEditingOwner(false)
  }

  if (!hasAdminAccess) {
    return (
      <div className="p-4">
        <h3 className="text-xl sm:text-2xl font-bold mt-4">Manage team members</h3>
        <div className="mt-6 space-y-4">
          <div className="border border-gray-400 h-44 rounded-md p-4">
            <h4 className="font-bold mb-2 text-center text-lg mt-10">
              Upgrade to Present Pro to unlock admin features
            </h4>
            <p className="text-gray-600 text-sm text-center font-medium -mt-2">
              Admins can add events, view check-ins, and export data.
            </p>
          </div>
          <button className="bg-black text-white font-medium rounded-lg px-4 py-2 hover:bg-gray-800 transition-all cursor-pointer">
            Upgrade to Present Pro
          </button>
        </div>
      </div>
    )
  }

  // Team Editing Mode
  if (viewMode === "edit") {
    return (
      <div className="p-4">
        <h3 className="text-xl sm:text-2xl font-bold mt-4">Manage team members</h3>

        {/* Editable Team Name */}
        <div className="mt-6 flex items-center gap-2">
          <Input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="text-lg font-semibold border-none bg-transparent p-0 focus:ring-0 focus:border-none shadow-none"
            placeholder="Team name"
          />
          <Edit2 className="w-4 h-4 text-gray-400" />
        </div>

        {/* Account Owner Row */}
        <div className="flex items-center gap-4 py-4 mt-4">
          <Avatar className="w-10 h-10">
            <img className="w-10 h-10" src="/profile.png" alt="" />
          </Avatar>
          <div className="flex-1 grid grid-cols-4 gap-4">
            <Input
              value={accountOwner.firstName}
              onChange={(e) => updateAccountOwner("firstName", e.target.value)}
              className="h-8 text-sm"
              placeholder="First Name"
            />
            <Input
              value={accountOwner.lastName}
              onChange={(e) => updateAccountOwner("lastName", e.target.value)}
              className="h-8 text-sm"
              placeholder="Last Name"
            />
            <Input
              value={accountOwner.email}
              onChange={(e) => updateAccountOwner("email", e.target.value)}
              className="h-8 text-sm"
              placeholder="Email"
            />
            <Input
              value={accountOwner.role}
              onChange={(e) => updateAccountOwner("role", e.target.value)}
              className="h-8 text-sm"
              placeholder="Role"
            />
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-[40px_1fr_1fr_1fr_1fr] gap-4 py-3 text-sm font-medium text-gray-500 border-t pt-4">
          <div></div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
          <div>Role</div>
        </div>

        {/* Admin Rows */}
        <div className="space-y-3">
          {admins.map((admin) => (
            <div key={admin.id} className="grid grid-cols-[40px_1fr_1fr_1fr_1fr] gap-4 items-center">
              <button
                onClick={() => removeAdmin(admin.id)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={`${admin.bgColor} text-white font-medium text-sm`}>
                    {admin.initials}
                  </AvatarFallback>
                </Avatar>
                <Input
                  value={admin.firstName}
                  onChange={(e) => updateAdmin(admin.id, "firstName", e.target.value)}
                  placeholder=""
                  className="h-8"
                />
              </div>

              <Input
                value={admin.lastName}
                onChange={(e) => updateAdmin(admin.id, "lastName", e.target.value)}
                placeholder=""
                className="h-8"
              />

              <Input
                type="email"
                value={admin.email}
                onChange={(e) => updateAdmin(admin.id, "email", e.target.value)}
                placeholder=""
                className="h-8"
              />

              <Input
                value={admin.role}
                onChange={(e) => updateAdmin(admin.id, "role", e.target.value)}
                placeholder=""
                className="h-8"
              />
            </div>
          ))}
        </div>

        <button onClick={handleSave} className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 mt-6">
          Save
        </button>
      </div>
    )
  }

  // Saved State - Show all team members
  if (viewMode === "saved") {
    return (
      <div className="p-4">
        <h3 className="text-xl sm:text-2xl font-semibold mt-4">Manage team members</h3>

        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-6">{teamName}</h4>

          {/* Account Owner */}
          <div className="flex items-center gap-4 py-3">
            <Avatar className="w-10 h-10">
              <img className="w-10 h-10" src="/profile.png" alt="" />
            </Avatar>
            <div className="flex-1 grid grid-cols-4 gap-4">
              <span className="text-sm font-medium">{accountOwner.firstName}</span>
              <span className="text-sm font-medium">{accountOwner.lastName}</span>
              <span className="text-sm text-gray-600">{accountOwner.email}</span>
              <span className="text-sm text-gray-600">{accountOwner.role}</span>
            </div>
          </div>

          {/* All Saved Admins */}
          {savedAdmins.map((admin) => (
            <div key={admin.id} className="flex items-center gap-4 py-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className={`${admin.bgColor} text-white font-medium text-sm`}>
                  {admin.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 grid grid-cols-4 gap-4">
                <span className="text-sm font-medium">{admin.firstName}</span>
                <span className="text-sm font-medium">{admin.lastName}</span>
                <span className="text-sm text-gray-600">{admin.email}</span>
                <span className="text-sm text-gray-600">{admin.role}</span>
              </div>
            </div>
          ))}

          {/* Edit Team Button */}
          <button
            onClick={handleEditTeam}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 mt-6 text-sm"
          >
            Edit Team
          </button>
        </div>
      </div>
    )
  }

  // Initial View - Editable owner info
  return (
    <div className="p-4">
      <h3 className="text-xl sm:text-2xl font-semibold mt-4">Manage team members</h3>

      <div className="mt-6">
        {/* Editable Team Name */}
        <div className="mb-6">
          {isEditingOwner ? (
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="text-base font-medium border-none bg-transparent p-0 focus:ring-0 focus:border-none shadow-none"
              placeholder="Team name"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-6">
              <h4 className="text-lg font-semibold">{teamName}</h4>
              <button onClick={() => setIsEditingOwner(true)}>
                <PencilIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </button>
            </div>
          )}
        </div>

        {/* Account Owner Row - Editable */}
        <div className="flex items-center gap-4 py-3">
          <Avatar className="w-10 h-10">
            <img className="w-10 h-10" src="/profile.png" alt="" />
          </Avatar>
          <div className="flex-1 grid grid-cols-4 gap-4">
            {isEditingOwner ? (
              <>
                <Input
                  value={accountOwner.firstName}
                  onChange={(e) => updateAccountOwner("firstName", e.target.value)}
                  className="h-8 text-sm"
                  placeholder="First Name"
                />
                <Input
                  value={accountOwner.lastName}
                  onChange={(e) => updateAccountOwner("lastName", e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Last Name"
                />
                <Input
                  value={accountOwner.email}
                  onChange={(e) => updateAccountOwner("email", e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Email"
                />
                <Input
                  value={accountOwner.role}
                  onChange={(e) => updateAccountOwner("role", e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Role"
                />
              </>
            ) : (
              <>
                <span className="text-sm font-medium">{accountOwner.firstName}</span>
                <span className="text-sm font-medium">{accountOwner.lastName}</span>
                <span className="text-sm text-gray-600">{accountOwner.email}</span>
                <span className="text-sm text-gray-600">{accountOwner.role}</span>
              </>
            )}
          </div>
          <button onClick={() => setIsEditingOwner(true)}>
            <PencilIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {isEditingOwner ? (
            <>
              <button
                onClick={handleSaveOwnerInfo}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm"
              >
                Save Info
              </button>
              <button
                onClick={() => setIsEditingOwner(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditTeam}
                className="border border-gray-300 font-semibold text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                Edit Team
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

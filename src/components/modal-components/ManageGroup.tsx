"use client"

import { Plus, X, Pencil } from "lucide-react"
import { useAppContext } from "../../context/app-context"

export default function ManageGroup() {
  const {
    createdGroups,
    setGroupsView,
    handleEditGroup,
    handleDeleteGroup,
    handleViewGroupDetails,
    currentPlan,
    limits,
  } = useAppContext()

  const canAddMoreGroups = createdGroups.length < limits.maxGroups

  return (
    <div className="p-2">
      <h3 className="text-start text-xl sm:text-2xl font-bold mt-4">Manage groups</h3>
      <div className="flex justify-start items-center gap-2 font-medium text-black text-lg sm:text-xl mt-5">
        You have created {createdGroups.length}/{limits.maxGroups} groups
        <Plus className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8" />
      </div>

      {createdGroups.length > 0 ? (
        <div className="mt-7 mb-5 space-y-4">
          {createdGroups.map((group) => (
            <div key={group.id} className="flex items-center justify-between py-4">
              <div className="flex items-center justify-between lg:w-2/3 w-full gap-4">
                <div
                  className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => handleViewGroupDetails(group.id)}
                >
                  <div className="text-lg sm:text-xl font-bold text-black hover:text-blue-950 transition-colors">
                    {group.name}
                  </div>
                  <div className="text-sm text-gray-600">Group Name</div>
                </div>

                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-black">
                    {group.memberCount}/{limits.maxMembersPerGroup}
                  </div>
                  <div className="text-sm text-gray-600">Group Members</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditGroup(group.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-md p-6 mt-7 mb-5 h-32 sm:h-48 flex flex-col items-center justify-center text-center">
          <h4 className="font-bold text-base sm:text-lg">No groups yet.</h4>
          <p className="text-sm text-gray-900">Create a group here</p>
        </div>
      )}

      <button
        onClick={() => canAddMoreGroups && setGroupsView("add")}
        disabled={!canAddMoreGroups}
        className={`text-center w-full sm:w-2/5 rounded-md py-2 sm:py-1.5 font-semibold text-sm sm:text-base cursor-pointer transition-colors ${
          canAddMoreGroups ? "bg-black text-white hover:bg-gray-800" : "bg-zinc-900 text-gray-50 cursor-not-allowed"
        }`}
      >
        {canAddMoreGroups
          ? createdGroups.length > 0
            ? "Add Another Group"
            : "Create Your First Group"
          : `Upgrade to Add More Groups (${currentPlan === "free" ? "Plus" : "Pro"} Plan)`}
      </button>
    </div>
  )
}

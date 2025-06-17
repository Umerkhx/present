import { Plus, X, Pencil } from 'lucide-react';

type GroupsView = "manage" | "add" | "modal";

interface Group {
    id: string;
    name: string;
    memberCount: number;
}

interface ManageGroupProps {
    createdGroups: Group[];
    setGroupsView: (view: GroupsView) => void;
    onEditGroup: (groupId: string) => void;
    onDeleteGroup: (groupId: string) => void;
}

export default function ManageGroup({ 
    createdGroups, 
    setGroupsView, 
    onEditGroup, 
    onDeleteGroup 
}: ManageGroupProps) {
    return (
        <div className="p-2">
            <h3 className="text-start text-xl sm:text-2xl font-semibold mt-4">Manage groups</h3>
            <div className="flex justify-start items-center gap-2 font-medium text-black text-lg sm:text-xl mt-5">
                You have created {createdGroups.length}/1 groups
                <Plus className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            {createdGroups.length > 0 ? (
                <div className="mt-7 mb-5 space-y-4">
                    {createdGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between py-4">
                            <div className="flex items-center justify-between lg:w-2/3 w-full gap-4">
                                <div className="">
                                    <div className="text-lg sm:text-xl font-semibold text-black">{group.name}</div>
                                    <div className="text-sm text-gray-600">Group Name</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-lg sm:text-xl font-semibold text-black">{group.memberCount}</div>
                                    <div className="text-sm text-gray-600">Group Members</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => onEditGroup(group.id)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => onDeleteGroup(group.id)}
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
                    <h4 className="font-semibold text-base sm:text-lg">No groups yet.</h4>
                    <p className="text-sm text-gray-900">Create a group here</p>
                </div>
            )}

            <button
                onClick={() => setGroupsView("add")}
                className="bg-black text-center w-full sm:w-2/5 rounded-md py-2 sm:py-1.5 text-white font-medium text-sm sm:text-base cursor-pointer hover:bg-gray-800 transition-colors"
            >
                {createdGroups.length > 0 ? "Upgrade To Add More Groups" : "Upgrade To Add More Groups"}
            </button>
        </div>
    );
}
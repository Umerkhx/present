import React from 'react';
import { Input } from '../ui/input';

type GroupsView = "manage" | "add" | "modal";

interface AddGroupProps {
    groupName: string;
    setGroupName: (name: string) => void;
    setGroupsView: (view: GroupsView) => void;
    setEditingGroupId: (id: string | null) => void;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddGroup({ 
    groupName, 
    setGroupName, 
    setGroupsView, 
    setEditingGroupId, 
    onFileUpload 
}: AddGroupProps) {
    return (
        <div className="p-4">
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">Add a Group</h3>
            <Input
                className="my-5 text-lg sm:text-2xl font-medium outline-none bg-transparent border-none w-full focus:border-none focus:outline-none active:outline-none"
                placeholder="Add Group Name"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                autoFocus
            />

            <div className="border-2 border-gray-300 rounded-md p-6 mt-7 mb-5 h-32 sm:h-48 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors">
                <h4 className="font-semibold text-base sm:text-lg">Upload your roster here</h4>
                <p className="text-sm text-gray-900 mb-4">CSV or Excel docs only</p>
                <input type="file" accept=".csv,.xlsx,.xls" onChange={onFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="bg-black text-white px-4 py-2 rounded-md cursor-pointer text-sm">
                    Choose File
                </label>
            </div>
            
            <button
                onClick={() => {
                    if (groupName.trim()) {
                        setEditingGroupId(null);
                        setGroupsView("modal");
                    }
                }}
                className="bg-transparent cursor-pointer flex justify-center items-center border border-gray-400 mx-auto text-center w-full sm:w-1/2 lg:w-1/4 rounded-md py-2 sm:py-1.5 text-black font-medium text-sm sm:text-base hover:border-gray-600"
            >
                Add Members Individually
            </button>
        </div>
    );
}
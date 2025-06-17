
export default function Admin() {
    return (
        <div className="p-4">
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">Dummy Admin Section</h3>
            <div className="mt-6 space-y-4">
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">User Management</h4>
                    <p className="text-gray-600 text-sm">Manage users and permissions</p>
                </div>
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">System Settings</h4>
                    <p className="text-gray-600 text-sm">Configure system preferences</p>
                </div>
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Analytics</h4>
                    <p className="text-gray-600 text-sm">View system analytics and reports</p>
                </div>
            </div>
        </div>
    );
}

export default function SubscriptionPanel() {
    return (
        <div className="p-4">
            <h3 className="text-xl sm:text-2xl font-semibold mt-4">Dummy Subscription Section</h3>
            <div className="mt-6 space-y-4">
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Current Plan</h4>
                    <p className="text-gray-600 text-sm">Free Plan - 1 Group Limit</p>
                </div>
                <div className="border rounded-md p-4">
                    <h4 className="font-semibold mb-2">Upgrade Options</h4>
                    <p className="text-gray-600 text-sm">Unlock unlimited groups and features</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 text-sm">Upgrade Now</button>
                </div>
            </div>
        </div>
    );
}
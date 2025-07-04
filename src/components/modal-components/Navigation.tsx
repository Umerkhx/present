import { useAppContext } from "../../context/app-context";


export default function Navigation() {
    const { activeTab, setActiveTab, setGroupsView } = useAppContext()
    return (
        <div className="flex sm:flex-row flex-col items-center gap-2 sm:gap-4 sm:justify-start justify-center px-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`rounded-lg font-medium px-3 py-2 border transition-colors ${activeTab === "profile" ? "border-black bg-gray-50" : "border-gray-400 bg-transparent hover:border-gray-600"}`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab("admin")}
                    className={`rounded-lg font-medium px-3 py-2 border transition-colors ${activeTab === "admin" ? "border-black bg-gray-50" : "border-gray-400 bg-transparent hover:border-gray-600"}`}
                >
                    Admin
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => {
                        setActiveTab("groups");
                        setGroupsView("manage");
                    }}
                    className={`rounded-lg font-medium px-3 py-2 border transition-colors ${activeTab === "groups" ? "border-black bg-gray-50" : "border-gray-400 bg-transparent hover:border-gray-600"}`}
                >
                    Groups
                </button>
                <button
                    onClick={() => setActiveTab("subscription")}
                    className={`rounded-lg font-medium px-3 py-2 border transition-colors ${activeTab === "subscription"
                            ? "border-black bg-gray-50"
                            : "border-gray-400 bg-transparent hover:border-gray-600"
                        }`}
                >
                    Subscription
                </button>
            </div>
        </div>
    );
}
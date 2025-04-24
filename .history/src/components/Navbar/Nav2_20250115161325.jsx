import { useState } from "react";
import "./NAv"

function Nav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            {/* Sidebar Toggle Button */}
            <button onClick={toggleSidebar} className="toggle-btn">
                {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content">
                <h1>Main Content</h1>
            </div>
        </div>
    );
}

export default Nav;
// components/Sidebar.jsx
import React from 'react';
import { Home, Book, Rss, Menu, X, Folder, Settings, LifeBuoy, BarChart2, UserCircle } from 'lucide-react'; //

const Sidebar = ({ activeTab, handleNavLinkClick, isSidebarOpen, setIsSidebarOpen, isSidebarExpanded, setIsSidebarLockedOpen, setIsSidebarHovered }) => { //

  const handleToggleClick = () => { //
    // Toggle the locked state for desktop sidebar
    setIsSidebarLockedOpen(prev => { //
      const newLockedState = !prev; //
      // If the sidebar is being unlocked (i.e., newLockedState is false),
      // also ensure it's not considered hovered, so it collapses immediately.
      if (!newLockedState) { //
        setIsSidebarHovered(false); //
      }
      return newLockedState; //
    });
    // If it's currently mobile open, close it
    if (isSidebarOpen) { //
      setIsSidebarOpen(false); //
    }
  };

  return (
    <aside
      // Add onMouseEnter and onMouseLeave handlers for hover functionality
      onMouseEnter={() => setIsSidebarHovered(true)} //
      onMouseLeave={() => setIsSidebarHovered(false)} //
      className={`fixed inset-y-0 left-0 h-full z-20
        bg-white backdrop-filter backdrop-blur-lg border-r border-white flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isSidebarExpanded ? 'w-64' : 'w-20'} /* Adjusted collapsed width to w-20 (80px) */ //
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} //
        lg:translate-x-0`} /* Mobile: slides in/out, Desktop: always visible, width changes */ //
    >
      {/* Mobile Close button - visible only on small screens when sidebar is open */}
      {isSidebarOpen && ( //
        <button
          onClick={() => setIsSidebarOpen(false)} //
          className="absolute top-4 right-4 p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-gray-100 transition duration-100 lg:hidden" //
          title="Close sidebar"
        >
          <X size={20} /> {/* */}
        </button>
      )}

      {/* Top section for toggle button AND app name */}
      <div className="flex items-center justify-start px-6 pt-4 pb-16 transition-all duration-300 ease-in-out"> {/* */}
        {/* Toggle Button for Desktop - positioned at the top-left */}
        <button
          onClick={handleToggleClick} //
          className="hidden lg:flex items-center justify-center p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-200 transition duration-200 flex-shrink-0" //
          title={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"} //
        >
          <Menu size={25} /> {/* */}
        </button>

      </div>

      <nav className="flex-grow"> {/* */}
        <ul> {/* */}
          {[
            { name: 'Dashboard', icon: Home, tab: 'generate' }, //
            { name: 'Recent Uploads', icon: Folder, tab: 'recent-uploads' }, //
            { name: 'Generated Contents', icon: Rss, tab: 'generated-content-overview' }, //
            { name: 'Content Library', icon: Book, tab: 'content-library' }, //
            { name: 'Analytics', icon: BarChart2, tab: 'analytics' }, //

          ].map((item) => ( //
            <li key={item.tab} className="mb-2"> {/* */}
              <button
                onClick={() => handleNavLinkClick(item.tab)} //
                className={`group flex items-center w-full py-3 rounded-lg text-lg font-medium text-left transition-all duration-200 pl-6
                  ${activeTab === item.tab
                    ? 'bg-gradient-to-b from-indigo-400 to-indigo-600 text-white border-indigo-900 shadow-md' // Active state with gradient and white text
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-violet-100' // Hover state with subtle gradient
                  }
                  `}
              >
                <item.icon className={`flex-shrink-0 transition-colors duration-200
                  ${activeTab === item.tab ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} mr-4`} size={20} />
                <span className={`flex-grow whitespace-nowrap overflow-hidden
                  ${isSidebarExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-full w-0'} transition-all duration-300 ease-in-out`}>
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section for User Profile and Settings */}
      <div className="mt-auto pt-6 border-t border-blue-200 border-opacity-50"> {/* */}
        <ul> {/* */}
          {[
            { name: 'Profile', icon: UserCircle, tab: 'profile' }, //
            { name: 'Settings', icon: Settings, tab: 'settings' }, //
            { name: 'Help & Support', icon: LifeBuoy, tab: 'help' }, //
          ].map((item) => ( //
            <li key={item.tab} className="mb-2"> {/* */}
              <button
                onClick={() => handleNavLinkClick(item.tab)} //
                className={`group flex items-center w-full py-3 rounded-lg text-lg font-medium text-left transition-all duration-200 pl-6
                  ${activeTab === item.tab
                    ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-blue-500 shadow-md' // Active state with gradient and white text
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100' // Hover state with subtle gradient
                  }`}
              >
                <item.icon className={`flex-shrink-0 transition-colors duration-100
                  ${activeTab === item.tab ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} mr-4`} size={20} />
                <span className={`flex-grow whitespace-nowrap overflow-hidden
                  ${isSidebarExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-full w-0'} transition-all duration-300 ease-in-out`}>
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`h-screen bg-white transition-all duration-300
      ${collapsed ? "w-20" : "w-72"}`}
    >
      <div className="flex items-center justify-between p-4 relative">
        {!collapsed ? <h3 className="text-xl">Admin</h3> : <h3>A</h3>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-0 items-center"
        >
          {collapsed ? (
            <ChevronRight
              size={16}
              className="hover:bg-gray-200 rounded-full"
            />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>
      <nav className="flex-1 px-4 py-2 space-y-2">
        {routes.map((r) => (
          <Link
            key={r.path}
            to={r.path}
            className={`block px-3 py-2 rounded ${
              location.pathname === r.path
                ? "bg-blue-100 border border-blue-300 rounded-md text-blue-800 "
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex gap-2 text-sm items-center">
              <span className="w-5 h-5 flex items-center justify-center"> {<r.icon size={18} />}</span>
              <span> {!collapsed && r.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;

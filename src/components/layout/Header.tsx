import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  username?: string;
  avatarUrl?: string;
};

const Header = ({ username, avatarUrl }: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const initials = username?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-12 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                {initials}
              </div>
            )}
            <span className="text-sm font-medium">
              {username ?? "Username"}
            </span>
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-30 bg-white rounded shadow-lg">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-2" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;

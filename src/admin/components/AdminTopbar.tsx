import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function AdminTopbar() {
  const navigate = useNavigate();
  
  const userStr = localStorage.getItem("adminUser");
  const user = userStr ? JSON.parse(userStr) : { username: "Admin" };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="h-16 bg-white border-b border-[#C3C6D1] flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold text-[#165DB2] uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
          Dashboard
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-[#43474F] font-sans text-sm">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-[#165DB2]">
            <User className="w-4 h-4" />
          </div>
          <span className="font-semibold">{user.username}</span>
        </div>

        <div className="w-px h-6 bg-gray-200"></div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 font-sans text-sm font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import { LayoutDashboard, Layers, Stethoscope, Handshake } from "lucide-react";

export default function AdminSidebar() {
  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "Overview", end: true },
    { to: "/admin/services", icon: Layers, label: "Services" },
    { to: "/admin/equipment", icon: Stethoscope, label: "Equipment" },
    { to: "/admin/partners", icon: Handshake, label: "Partners" },
  ];

  return (
    <div className="w-64 bg-[#001E40] text-white flex flex-col h-full border-r border-[#0f2a4a]">
      <div className="h-16 flex items-center px-6 border-b border-[#0f2a4a]">
        <h2 className="font-sans font-bold text-lg tracking-wide">MKT <span className="font-mono text-[#7FF5F4] text-sm">ADMIN</span></h2>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-sm transition-colors ${
                  isActive
                    ? "bg-[#165DB2] text-white font-semibold"
                    : "text-[#C3C6D1] hover:bg-[#0f2a4a] hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

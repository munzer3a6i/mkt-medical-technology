import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function AdminApp() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F9FB]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

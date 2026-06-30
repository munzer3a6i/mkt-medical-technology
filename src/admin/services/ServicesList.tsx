import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import ServiceForm from "./ServiceForm";
import { Service } from "../../shared/types";

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>();
  
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setToast({ message: "Failed to load services", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete");
      
      setToast({ message: "Service deleted successfully", type: "success" });
      fetchServices();
    } catch (err) {
      setToast({ message: "Failed to delete service", type: "error" });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleOpenForm = (service?: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleCloseForm = (refresh?: boolean) => {
    setIsFormOpen(false);
    setEditingService(undefined);
    if (refresh) fetchServices();
  };

  if (isFormOpen) {
    return <ServiceForm service={editingService} onClose={handleCloseForm} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#001E40]">Services Management</h1>
          <p className="text-[#43474F] font-sans">Manage your specialized service divisions</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 bg-[#165DB2] text-white px-4 py-2 rounded hover:bg-[#001E40] transition-colors font-sans font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#C3C6D1] overflow-hidden">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-[#F7F9FB] border-b border-[#C3C6D1] text-[#43474F] uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-4 w-16">Order</th>
              <th className="p-4">Title (EN)</th>
              <th className="p-4">Badge</th>
              <th className="p-4 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">Loading...</td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">No services found.</td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-[#165DB2] font-mono font-bold">{s.sortOrder}</td>
                  <td className="p-4 font-semibold text-[#001E40]">{s.title}</td>
                  <td className="p-4">
                    {s.badgeLabel && (
                      <span className="inline-block px-2 py-1 bg-blue-50 text-[#165DB2] text-xs font-bold font-mono tracking-wider rounded">
                        {s.badgeLabel}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenForm(s)}
                        className="p-1.5 text-gray-400 hover:text-[#165DB2] hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(s.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog 
        isOpen={!!deleteConfirm}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
      />

      {toast && (
        <Toast 
          type={toast.type} 
          message={toast.message} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

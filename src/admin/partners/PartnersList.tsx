import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Building2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import PartnerForm from "./PartnerForm";
import { Partner } from "../../shared/types";

export default function PartnersList() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partner | undefined>();
  
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      setToast({ message: "Failed to load partners", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/partners/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to delete");
      
      setToast({ message: "Partner deleted successfully", type: "success" });
      fetchPartners();
    } catch (err) {
      setToast({ message: "Failed to delete partner", type: "error" });
    } finally {
      setDeleteConfirm(null);
    }
  };

  if (isFormOpen) {
    return <PartnerForm partner={editingItem} onClose={(refresh) => { setIsFormOpen(false); setEditingItem(undefined); if(refresh) fetchPartners(); }} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#001E40]">Partners Management</h1>
          <p className="text-[#43474F] font-sans">Manage your strategic alliances and clients</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-[#165DB2] text-white px-4 py-2 rounded hover:bg-[#001E40] transition-colors font-sans font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#C3C6D1] overflow-hidden">
        <table className="w-full text-left font-sans text-sm">
          <thead className="bg-[#F7F9FB] border-b border-[#C3C6D1] text-[#43474F] uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="p-4 w-20">Logo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">Loading...</td>
              </tr>
            ) : partners.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">No partners found.</td>
              </tr>
            ) : (
              partners.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} className="w-12 h-12 object-contain bg-white rounded border border-gray-200 p-1" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-[#165DB2]">
                        <Building2 className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold text-[#001E40]">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.category?.name || "Uncategorized"}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setEditingItem(item); setIsFormOpen(true); }}
                        className="p-1.5 text-gray-400 hover:text-[#165DB2] hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(item.id)}
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
        title="Delete Partner"
        message="Are you sure you want to delete this partner? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

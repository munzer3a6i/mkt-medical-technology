import { useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Service } from "../../shared/types";
import Toast from "../components/Toast";

interface ServiceFormProps {
  service?: Service;
  onClose: (refresh?: boolean) => void;
}

export default function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState<Partial<Service>>(
    service || {
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      longDescription: "",
      longDescriptionAr: "",
      iconName: "Activity",
      badgeLabel: "",
      badgeLabelAr: "",
      sortOrder: 0,
      keyProjects: [],
      keyProjectsAr: [],
      certifications: [],
    }
  );
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleArrayChange = (field: keyof Service, index: number, value: string) => {
    const arr = [...(formData[field] as string[])];
    arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };

  const handleAddArrayItem = (field: keyof Service) => {
    const arr = [...(formData[field] as string[]), ""];
    setFormData({ ...formData, [field]: arr });
  };

  const handleRemoveArrayItem = (field: keyof Service, index: number) => {
    const arr = [...(formData[field] as string[])];
    arr.splice(index, 1);
    setFormData({ ...formData, [field]: arr });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const method = service ? "PUT" : "POST";
      const url = service ? `/api/services/${service.id}` : "/api/services";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save service");
      
      setToast({ message: "Service saved successfully", type: "success" });
      setTimeout(() => onClose(true), 1500);
    } catch (err) {
      setToast({ message: "Failed to save service", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onClose()}
            className="p-2 bg-white border border-[#C3C6D1] rounded hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#43474F]" />
          </button>
          <div>
            <h1 className="text-2xl font-bold font-sans text-[#001E40]">
              {service ? "Edit Service" : "Add Service"}
            </h1>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-[#165DB2] text-white px-4 py-2 rounded hover:bg-[#001E40] transition-colors font-sans font-medium text-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#C3C6D1] p-6">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          
          {/* Basics */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Basic Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Title (English)</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase" dir="rtl">Title (Arabic)</label>
                <input type="text" value={formData.titleAr || ""} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Short Description (EN)</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2] min-h-[80px]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase" dir="rtl">Short Description (AR)</label>
                <textarea value={formData.descriptionAr || ""} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2] min-h-[80px]" dir="rtl" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Icon Name (Lucide)</label>
                <input required type="text" value={formData.iconName} onChange={e => setFormData({...formData, iconName: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Sort Order</label>
                <input required type="number" value={formData.sortOrder} onChange={e => setFormData({...formData, sortOrder: parseInt(e.target.value)})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Badge Label (EN)</label>
                <input type="text" value={formData.badgeLabel || ""} onChange={e => setFormData({...formData, badgeLabel: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" placeholder="e.g. ISO CERTIFIED" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase" dir="rtl">Badge Label (AR)</label>
                <input type="text" value={formData.badgeLabelAr || ""} onChange={e => setFormData({...formData, badgeLabelAr: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" dir="rtl" />
              </div>
            </div>
          </div>

          {/* Arrays */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Lists</h3>
            
            {/* Certifications */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Certifications</label>
                <button type="button" onClick={() => handleAddArrayItem("certifications")} className="text-xs text-[#165DB2] flex items-center gap-1 hover:underline">
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              {(formData.certifications as string[]).map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="text" value={cert} onChange={e => handleArrayChange("certifications", idx, e.target.value)} className="border rounded p-2 text-sm flex-1 outline-none focus:border-[#165DB2]" />
                  <button type="button" onClick={() => handleRemoveArrayItem("certifications", idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </form>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Partner, PartnerCategory } from "../../shared/types";
import Toast from "../components/Toast";

interface PartnerFormProps {
  partner?: Partner;
  onClose: (refresh?: boolean) => void;
}

export default function PartnerForm({ partner, onClose }: PartnerFormProps) {
  const [formData, setFormData] = useState<Partial<Partner>>(
    partner || {
      name: "",
      nameAr: "",
      categoryId: "",
      iconName: "",
    }
  );
  
  const [categories, setCategories] = useState<PartnerCategory[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(partner?.logo || null);
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/partners/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const method = partner ? "PUT" : "POST";
      const url = partner ? `/api/partners/${partner.id}` : "/api/partners";

      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'category' && formData[key as keyof Partner] !== null && formData[key as keyof Partner] !== undefined) {
          data.append(key, formData[key as keyof Partner] as string);
        }
      });

      if (imageFile) {
        data.append("logo", imageFile);
      }

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Failed to save partner");
      
      setToast({ message: "Partner saved successfully", type: "success" });
      setTimeout(() => onClose(true), 1500);
    } catch (err) {
      setToast({ message: "Failed to save partner", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
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
              {partner ? "Edit Partner" : "Add Partner"}
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
          
          <div className="flex flex-col gap-4">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Basic Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Name (English)</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase" dir="rtl">Name (Arabic)</label>
                <input type="text" value={formData.nameAr || ""} onChange={e => setFormData({...formData, nameAr: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" dir="rtl" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Category</label>
                <select value={formData.categoryId || ""} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]">
                  <option value="">Select a category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Icon Name (Lucide)</label>
                <input type="text" value={formData.iconName || ""} onChange={e => setFormData({...formData, iconName: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2]" placeholder="e.g. Shield" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Logo</h3>
            <div className="flex items-start gap-6">
              <div 
                className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#165DB2] cursor-pointer transition-colors relative overflow-hidden bg-white"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 mb-2" />
                    <span className="text-xs font-medium">Upload Logo</span>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p className="text-sm text-gray-600 font-sans">
                  Upload a high-quality logo (transparent PNG recommended).
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <button 
                    type="button" 
                    onClick={() => { setImagePreview(null); setImageFile(null); setFormData({ ...formData, logo: "" }); }}
                    className="text-red-500 text-sm font-medium hover:underline self-start"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>
          </div>

        </form>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

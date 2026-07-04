import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Save, Plus, X, Upload } from "lucide-react";
import { Equipment, EquipmentCategory } from "../../shared/types";
import Toast from "../components/Toast";

interface EquipmentFormProps {
  equipment?: Equipment;
  onClose: (refresh?: boolean) => void;
}

export default function EquipmentForm({ equipment, onClose }: EquipmentFormProps) {
  const [formData, setFormData] = useState<Partial<Equipment>>(
    equipment || {
      name: "",
      nameAr: "",
      categoryId: "",
      sku: "",
      description: "",
      descriptionAr: "",
      longDescription: "",
      longDescriptionAr: "",
      specifications: [],
      specificationsAr: [],
    }
  );
  
  const [categories, setCategories] = useState<EquipmentCategory[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(equipment?.image || null);
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/equipment/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  const handleArrayChange = (field: keyof Equipment, index: number, value: string) => {
    const arr = [...(formData[field] as string[])];
    arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };

  const handleAddArrayItem = (field: keyof Equipment) => {
    const arr = [...(formData[field] as string[]), ""];
    setFormData({ ...formData, [field]: arr });
  };

  const handleRemoveArrayItem = (field: keyof Equipment, index: number) => {
    const arr = [...(formData[field] as string[])];
    arr.splice(index, 1);
    setFormData({ ...formData, [field]: arr });
  };

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
      const method = equipment ? "PUT" : "POST";
      const url = equipment ? `/api/equipment/${equipment.id}` : "/api/equipment";

      // Upload image first if a new file was selected
      let imageUrl = formData.image;
      if (imageFile) {
        const uploadRes = await fetch(`/api/upload?filename=equipment/${Date.now()}-${imageFile.name}`, {
          method: "POST",
          body: imageFile,
        });
        if (uploadRes.ok) {
          const blob = await uploadRes.json();
          imageUrl = blob.url;
        }
      }

      const payload = {
        ...formData,
        image: imageUrl,
        specifications: formData.specifications,
        specificationsAr: formData.specificationsAr,
      };
      delete (payload as any).category;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save equipment");
      
      setToast({ message: "Equipment saved successfully", type: "success" });
      setTimeout(() => onClose(true), 1500);
    } catch (err) {
      setToast({ message: "Failed to save equipment", type: "error" });
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
              {equipment ? "Edit Equipment" : "Add Equipment"}
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
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">SKU</label>
                <input type="text" value={formData.sku || ""} onChange={e => setFormData({...formData, sku: e.target.value})} className="border rounded p-2 text-sm font-mono outline-none focus:border-[#165DB2]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Short Description (EN)</label>
                <textarea required value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2] min-h-[80px]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase" dir="rtl">Short Description (AR)</label>
                <textarea value={formData.descriptionAr || ""} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="border rounded p-2 text-sm outline-none focus:border-[#165DB2] min-h-[80px]" dir="rtl" />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Product Image</h3>
            <div className="flex items-start gap-6">
              <div 
                className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#165DB2] cursor-pointer transition-colors relative overflow-hidden bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-xs font-medium">Click to upload</span>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p className="text-sm text-gray-600 font-sans">
                  Upload a high-quality product image. Supported formats: JPG, PNG, WEBP.
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
                    onClick={() => { setImagePreview(null); setImageFile(null); setFormData({ ...formData, image: "" }); }}
                    className="text-red-500 text-sm font-medium hover:underline self-start"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold font-sans text-lg text-[#001E40] border-b pb-2">Specifications</h3>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold font-mono text-[#165DB2] uppercase">Key Features (EN)</label>
                <button type="button" onClick={() => handleAddArrayItem("specifications")} className="text-xs text-[#165DB2] flex items-center gap-1 hover:underline">
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              {(formData.specifications as string[]).map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="text" value={spec} onChange={e => handleArrayChange("specifications", idx, e.target.value)} className="border rounded p-2 text-sm flex-1 outline-none focus:border-[#165DB2]" />
                  <button type="button" onClick={() => handleRemoveArrayItem("specifications", idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
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

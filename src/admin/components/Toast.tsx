import { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const borderColor = type === "success" ? "border-green-200" : "border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded shadow-lg border ${bgColor} ${borderColor} ${textColor}`}>
      <Icon className="w-5 h-5" />
      <span className="font-sans text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

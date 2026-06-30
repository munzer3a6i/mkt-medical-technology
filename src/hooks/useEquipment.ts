import { useState, useEffect } from "react";
import { Equipment } from "../shared/types";

export function useEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/equipment")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch equipment");
        return res.json();
      })
      .then((data) => {
        setEquipment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { equipment, loading, error };
}

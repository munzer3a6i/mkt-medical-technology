import { useState, useEffect } from "react";
import { Partner } from "../shared/types";

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/partners")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch partners");
        return res.json();
      })
      .then((data) => {
        setPartners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { partners, loading, error };
}

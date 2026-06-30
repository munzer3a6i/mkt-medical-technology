import { useEffect, useState } from "react";
import { Layers, Stethoscope, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardOverview() {
  const [stats, setStats] = useState({ services: 0, equipment: 0, partners: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [servicesRes, equipmentRes, partnersRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/equipment"),
          fetch("/api/partners")
        ]);

        const [services, equipment, partners] = await Promise.all([
          servicesRes.json(),
          equipmentRes.json(),
          partnersRes.json()
        ]);

        setStats({
          services: services.length || 0,
          equipment: equipment.length || 0,
          partners: partners.length || 0
        });
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: "Services", count: stats.services, icon: Layers, link: "/admin/services" },
    { title: "Equipment", count: stats.equipment, icon: Stethoscope, link: "/admin/equipment" },
    { title: "Partners", count: stats.partners, icon: Handshake, link: "/admin/partners" },
  ];

  if (loading) {
    return <div className="animate-pulse flex gap-6">
      {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl w-64"></div>)}
    </div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold font-sans text-[#001E40]">Overview</h1>
        <p className="text-[#43474F] font-sans">Manage your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title}
              onClick={() => navigate(card.link)}
              className="bg-white rounded-xl shadow-sm border border-[#C3C6D1] p-6 flex items-center justify-between cursor-pointer hover:border-[#165DB2] hover:shadow-md transition-all group"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-bold text-[#165DB2] uppercase tracking-wider">
                  {card.title}
                </span>
                <span className="text-4xl font-bold font-sans text-[#001E40] group-hover:text-[#165DB2] transition-colors">
                  {card.count}
                </span>
              </div>
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#165DB2]">
                <Icon className="w-8 h-8" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

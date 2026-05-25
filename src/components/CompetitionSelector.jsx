import { useState, useEffect } from "react";
import { getCompetitions } from "../api/football";

export default function CompetitionSelector({ onSelect }) {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompetitions()
      .then((data) => setCompetitions(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-white/40">Cargando...</p>
      </div>
    );
  return (
    <div>
      <h1 className="text-white text-2xl font-medium px-6 pt-6">
        Competencias
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            onClick={() => onSelect(comp.code)}
            className="bg-[#0f1117] border border-white/8 rounded-xl p-4 flex items-center gap-4 hover:border-blue-500/50 cursor-pointer transition-colors"
          >
            <img src={comp.emblem} className="w-10 h-10 object-contain" />
            <div>
              <p className="text-white font-medium">{comp.name}</p>
              <p className="text-white/40 text-sm">{comp.area.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

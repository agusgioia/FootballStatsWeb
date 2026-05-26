import { useState, useEffect } from "react";
import { getLiveMatches } from "../api/football";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      setLoading(true);
      const liveMatches = await getLiveMatches();
      setMatches(liveMatches);
      setLoading(false);
    };

    fetchLiveMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-lg">Cargando partidos en vivo...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-medium px-6 pt-6">
        {" "}
        Partidos en Vivo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-[#0f1117] border border-white/8 rounded-xl p-4 flex flex-col gap-3"
          >
            <span
              className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                match.status === "IN_PLAY" || match.status === "PAUSED"
              }`}
            >
              {match.status === "IN_PLAY" ? "EN JUEGO" : "PAUSADO"}
            </span>
            <div className="flex items-center justify-between gap-4">
              <p className="text-white text-sm flex-1">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

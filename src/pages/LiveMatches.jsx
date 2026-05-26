import { useState, useEffect } from "react";
import { getLiveMatches } from "../api/football";
import { Link } from "react-router-dom";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      setLoading(true);
      const liveMatches = await getLiveMatches();
      console.log("Partidos en vivo:", liveMatches);
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
                {match.homeTeam.shortName}
                <Link
                  to={`/teams/${match.homeTeam.id}`}
                  className="ml-2 text-blue-400 hover:underline"
                >
                  {match.homeTeam.crest && (
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="w-8 h-8 ml-2"
                    />
                  )}
                </Link>
              </p>
              <div className="text-white font-medium text-lg tabular-nums">
                {match.score.fullTime.home ?? "-"} —{" "}
                {match.score.fullTime.away ?? "-"}
              </div>
              <p className="text-white text-sm flex-1 text-right">
                {match.awayTeam.shortName}
                <Link
                  to={`/teams/${match.awayTeam.id}`}
                  className="ml-2 text-blue-400 hover:underline"
                >
                  {match.awayTeam.crest && (
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="w-8 h-8 ml-60"
                    />
                  )}
                </Link>
              </p>
            </div>
            <p className="text-white/30 text-xs">Jornada {match.matchday}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

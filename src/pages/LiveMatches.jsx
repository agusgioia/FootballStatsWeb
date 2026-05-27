import { useState, useEffect } from "react";
import { getLiveMatches } from "../api/football";
import { Link } from "react-router-dom";
import {
  getStatusBadgeClass,
  getStatusLabel,
  getScore,
} from "../utils/matchStatus";

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
        <p className="text-white/40">Cargando partidos en vivo...</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2">
        <p className="text-white text-lg font-medium">
          No hay partidos en vivo
        </p>
        <p className="text-white/40 text-sm">
          Volvé cuando haya partidos en curso
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-medium px-6 pt-6">
        Partidos en Vivo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-[#0f1117] border border-white/8 rounded-xl p-4 flex flex-col gap-3"
          >
            <span
              className={`text-xs px-2 py-0.5 rounded-full w-fit ${getStatusBadgeClass(match.status)}`}
            >
              {getStatusLabel(match.status, match.utcDate)}
            </span>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                {match.homeTeam.crest && (
                  <Link to={`/teams/${match.homeTeam.id}`}>
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="w-6 h-6 object-contain"
                    />
                  </Link>
                )}
                <p className="text-white text-sm">{match.homeTeam.shortName}</p>
              </div>

              <div className="text-white font-medium text-lg tabular-nums">
                <Link to={`/matches/${match.id}`}>{getScore(match)}</Link>
              </div>

              <div className="flex items-center gap-2 flex-1 justify-end">
                <p className="text-white text-sm">{match.awayTeam.shortName}</p>
                {match.awayTeam.crest && (
                  <Link to={`/teams/${match.awayTeam.id}`}>
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="w-6 h-6 object-contain"
                    />
                  </Link>
                )}
              </div>
            </div>

            <p className="text-white/30 text-xs">Jornada {match.matchday}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

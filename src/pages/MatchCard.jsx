import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatch } from "../api/football";
import {
  getStatusBadgeClass,
  getStatusLabel,
  getScore,
} from "../utils/matchStatus";

const MatchCard = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        const data = await getMatch(id);
        setMatch(data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white/40">Cargando partidos en vivo...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <div className="bg-[#0f1117] border border-white/8 rounded-xl p-4 flex flex-col gap-3">
        <span
          className={`text-xs px-2 py-0.5 rounded-full w-fit ${getStatusBadgeClass(match.status)}`}
        >
          {getStatusLabel(match.status, match.utcDate)}
        </span>
        <p className="text-white/30 text-xs">Jornada {match.matchday}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            {match.homeTeam.crest && (
              <img
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                className="w-6 h-6 object-contain"
              />
            )}
            <p className="text-white text-sm">{match.homeTeam.shortName}</p>
          </div>

          <div className="text-white font-medium text-lg tabular-nums">
            {getScore(match)}
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <p className="text-white text-sm">{match.awayTeam.shortName}</p>
            {match.awayTeam.crest && (
              <img
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                className="w-6 h-6 object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;

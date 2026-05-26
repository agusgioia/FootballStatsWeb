import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatches } from "../api/football";
import CompetitionSelector from "../components/CompetitionSelector";
import { useNavigate, Link } from "react-router-dom";

const Matches = () => {
  const { code } = useParams();
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getMatches(code);
      setMatches(data);
    };
    fetchMatches();
  }, [code]);

  if (!code)
    return (
      <CompetitionSelector
        onSelect={(code) => navigate(`/competitions/${code}/matches`)}
      />
    );

  return (
    <div>
      <h1 className="text-white text-2xl font-medium px-6 pt-6">Partidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-[#0f1117] border border-white/8 rounded-xl p-4 flex flex-col gap-3"
          >
            {/* Badge de estado */}
            <span
              className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                match.status === "IN_PLAY" || match.status === "PAUSED"
                  ? "bg-green-400/10 text-green-400 border border-green-400/25"
                  : match.status === "FINISHED"
                    ? "bg-white/5 text-white/40 border border-white/8"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/25"
              }`}
            >
              {match.status === "IN_PLAY"
                ? "● En vivo"
                : match.status === "PAUSED"
                  ? "● Entretiempo"
                  : match.status === "FINISHED"
                    ? "Finalizado"
                    : new Date(match.utcDate).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
            </span>

            {/* Equipos y marcador */}
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
                      className="w-8 h-8 ml-70"
                    />
                  )}
                </Link>
              </p>
            </div>

            {/* Jornada */}
            <p className="text-white/30 text-xs">Jornada {match.matchday}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;

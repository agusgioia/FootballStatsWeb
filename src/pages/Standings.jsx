import { useEffect, useState } from "react";
import { getPositions } from "../api/football";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import CompetitionSelector from "../components/CompetitionSelector";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const navigate = useNavigate();
  const { code } = useParams();

  useEffect(() => {
    const fetchStandings = async () => {
      const data = await getPositions(code);
      const total = data.find((s) => s.type === "TOTAL");
      const table = total?.table ?? [];
      setStandings(table);
    };

    fetchStandings();
  }, [code]);

  if (!code)
    return (
      <CompetitionSelector
        onSelect={(code) => navigate(`/competitions/${code}/standings`)}
      />
    );

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl font-medium mb-6">Posiciones</h2>
      <table className="w-full">
        <thead>
          <tr className="text-white/40 text-xs border-b border-white/8">
            <th className="text-left pb-3">#</th>
            <th className="text-left pb-3">Equipo</th>
            <th className="text-center pb-3">PJ</th>
            <th className="text-center pb-3">G</th>
            <th className="text-center pb-3">E</th>
            <th className="text-center pb-3">P</th>
            <th className="text-center pb-3">GF</th>
            <th className="text-center pb-3">GC</th>
            <th className="text-center pb-3">DG</th>
            <th className="text-center pb-3">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr
              key={team.team.id}
              className="border-b border-white/4 hover:bg-white/2"
            >
              <td className="py-3 text-white/40 text-sm">{team.position}</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/teams/${team.team.id}`}
                    className="flex items-center gap-2"
                  >
                    {team.team.crest && (
                      <img
                        src={team.team.crest}
                        className="w-5 h-5 object-contain"
                      />
                    )}
                  </Link>
                  <span className="text-white text-sm">
                    {team.team.shortName}
                  </span>
                </div>
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.playedGames}
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.won}
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.draw}
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.lost}
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.goalsFor}
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.goalsAgainst}
              </td>
              <td className="py-3 text-center text-white/60 text-sm">
                {team.goalDifference}
              </td>
              <td className="py-3 text-center text-white font-medium text-sm">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;

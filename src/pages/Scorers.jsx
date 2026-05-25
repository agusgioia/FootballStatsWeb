import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScorers } from "../api/football";
import CompetitionSelector from "../components/CompetitionSelector";

export default function Scorers() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [scorers, setScorers] = useState([]);

  useEffect(() => {
    const fetchScorers = async () => {
      const data = await getScorers(code);
      setScorers(data);
    };
    fetchScorers();
  }, [code]);

  if (!code) {
    return (
      <CompetitionSelector
        onSelect={(code) => navigate(`/competitions/${code}/scorers`)}
      />
    );
  }

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const maxGoals = scorers[0]?.goals ?? 1;

  const getRankClass = (index) => {
    if (index === 0) return "gold";
    if (index === 1) return "silver";
    if (index === 2) return "bronze";
    return "";
  };

  return (
    <div className="page">
      <p className="title">Goleadores</p>
      <div className="list">
        {scorers.map((scorer, index) => {
          const barWidth = (scorer.goals / maxGoals) * 100;

          return (
            <div className="row" key={scorer.player.id}>
              <span className={`rank ${getRankClass(index)}`}>{index + 1}</span>

              <div className="avatar">{getInitials(scorer.player.name)}</div>

              <div className="info">
                <p className="player-name">{scorer.player.name}</p>
                <p className="team-name">{scorer.team.name}</p>
              </div>

              <div className="bar-wrap">
                <div className="bar-bg">
                  <div
                    className="bar-fill"
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>
              </div>

              <div className="stats">
                <div className="stat">
                  <p className="stat-value">{scorer.assists ?? "-"}</p>
                  <p className="stat-label">Ast</p>
                </div>
                <div className="stat">
                  <p className="stat-value goals">{scorer.goals}</p>
                  <p className="stat-label">Goles</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

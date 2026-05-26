import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTeam, getTeamMatches } from "../api/football";

export default function Team() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [matchFilter, setMatchFilter] = useState("ALL");

  useEffect(() => {
    console.log("Cargando datos para el equipo ID:", teamId);
    const fetchTeamData = async () => {
      setLoading(true);
      try {
        const [teamData, matchesData] = await Promise.all([
          getTeam(teamId),
          getTeamMatches(teamId),
        ]);

        setTeam(teamData);
        setMatches(matchesData.matches || []);
      } catch (error) {
        console.error("Error al obtener los datos del equipo:", error);
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      fetchTeamData();
    }
  }, [teamId]);

  if (loading) {
    return <div className="team-loading">Cargando detalles del equipo...</div>;
  }

  if (!team) {
    return (
      <div className="team-error">
        No se pudo cargar la información del equipo.
      </div>
    );
  }

  // Filtrado lógico de los partidos en el cliente
  const filteredMatches = matches.filter((match) => {
    if (matchFilter === "ALL") return true;
    return match.status === matchFilter;
  });

  return (
    <div className="team-page">
      {/* Botón de retorno opcional */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      {/* Encabezado Principal */}
      <div className="team-card-header">
        <img
          src={team.crest}
          alt={`Escudo de ${team.name}`}
          className="team-large-crest"
        />
        <div className="team-meta">
          <h1 className="team-main-title">{team.name}</h1>
          <p className="team-sub">
            {team.venue} • Fundado en {team.founded || "N/D"}
          </p>
          {team.runningCompetitions && (
            <div className="competitions-tags">
              {team.runningCompetitions.map((comp) => (
                <span key={comp.id} className="comp-tag">
                  {comp.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="team-tabs-nav">
        <button
          className={`team-tab-link ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Información
        </button>
        <button
          className={`team-tab-link ${activeTab === "squad" ? "active" : ""}`}
          onClick={() => setActiveTab("squad")}
        >
          Plantilla
        </button>
        <button
          className={`team-tab-link ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          Partidos
        </button>
      </div>

      {/* Bloques de Contenido Dinámico */}
      <div className="team-tab-viewport">
        {/* Pestaña: Información General */}
        {activeTab === "info" && (
          <div className="panel-info">
            <div className="info-grid-item">
              <span className="info-label">Nombre oficial</span>
              <span className="info-value">
                {team.officialName || team.name}
              </span>
            </div>
            <div className="info-grid-item">
              <span className="info-label">Siglas / TLA</span>
              <span className="info-value">{team.tla || "-"}</span>
            </div>
            <div className="info-grid-item">
              <span className="info-label">Colores del club</span>
              <span className="info-value">{team.clubColors || "-"}</span>
            </div>
            <div className="info-grid-item">
              <span className="info-label">Sitio Web Oficial</span>
              <span className="info-value">
                <a
                  href={team.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-link"
                >
                  {team.website
                    ? team.website
                        .replace("http://", "")
                        .replace("https://", "")
                    : "-"}
                </a>
              </span>
            </div>
          </div>
        )}

        {/* Pestaña: Plantilla (Squad) */}
        {activeTab === "squad" && (
          <div className="panel-squad">
            <div className="squad-table-header">
              <span>Posición</span>
              <span>Jugador</span>
              <span>Nacionalidad</span>
            </div>
            <div className="squad-container">
              {team.squad && team.squad.length > 0 ? (
                team.squad.map((player) => (
                  <div className="squad-member-row" key={player.id}>
                    <span className="player-pos-badge">
                      {player.position || "Staff"}
                    </span>
                    <span className="player-real-name">{player.name}</span>
                    <span className="player-nat">{player.nationality}</span>
                  </div>
                ))
              ) : (
                <p className="no-data-msg">
                  Información de plantilla no disponible por el momento.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Pestaña: Partidos (Matches) */}
        {activeTab === "matches" && (
          <div className="panel-matches">
            {/* Filtros internos para los partidos */}
            <div className="matches-filter-bar">
              <button
                className={`filter-btn ${matchFilter === "ALL" ? "selected" : ""}`}
                onClick={() => setMatchFilter("ALL")}
              >
                Todos
              </button>
              <button
                className={`filter-btn ${matchFilter === "FINISHED" ? "selected" : ""}`}
                onClick={() => setMatchFilter("FINISHED")}
              >
                Finalizados
              </button>
              <button
                className={`filter-btn ${matchFilter === "SCHEDULED" ? "selected" : ""}`}
                onClick={() => setMatchFilter("SCHEDULED")}
              >
                Próximos
              </button>
            </div>

            <div className="matches-timeline">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match) => {
                  const isHome = match.homeTeam.id === Number(teamId);
                  return (
                    <div className="match-card-row" key={match.id}>
                      <div className="match-time-meta">
                        <span className="match-date-txt">
                          {new Date(match.utcDate).toLocaleDateString(
                            undefined,
                            { day: "numeric", month: "short" },
                          )}
                        </span>
                      </div>

                      <div className="match-teams-vs">
                        <span
                          className={`team-name-display ${isHome ? "highlight-own" : ""}`}
                        >
                          {match.homeTeam.name}
                        </span>

                        <div className="score-capsule">
                          {match.status === "FINISHED" ? (
                            <span className="score-numbers">
                              {match.score.fullTime.home} -{" "}
                              {match.score.fullTime.away}
                            </span>
                          ) : (
                            <span className="vs-badge">VS</span>
                          )}
                        </div>

                        <span
                          className={`team-name-display ${!isHome ? "highlight-own" : ""}`}
                        >
                          {match.awayTeam.name}
                        </span>
                      </div>

                      <div className="match-status-indicator">
                        <span
                          className={`status-pill ${match.status.toLowerCase()}`}
                        >
                          {match.status === "FINISHED" ? "Fin" : "Prog"}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="no-data-msg">
                  No hay partidos registrados bajo este filtro.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

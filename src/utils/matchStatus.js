export const getStatusBadgeClass = (status) => {
  if (status === "IN_PLAY" || status === "PAUSED")
    return "bg-green-400/10 text-green-400 border border-green-400/25";
  if (status === "FINISHED")
    return "bg-white/5 text-white/40 border border-white/[0.08]";
  return "bg-blue-500/10 text-blue-400 border border-blue-500/25";
};

export const getStatusLabel = (status, utcDate) => {
  if (status === "IN_PLAY") return "● En vivo";
  if (status === "PAUSED") return "● Entretiempo";
  if (status === "FINISHED") return "Finalizado";
  if (status === "POSTPONED") return "Postergado";
  if (status === "CANCELLED") return "Cancelado";
  if (status === "SUSPENDED") return "Suspendido";
  return new Date(utcDate).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getScore = (match) => {
  const { status, score } = match;
  if (status === "IN_PLAY" || status === "PAUSED") {
    const home = score.halfTime?.home ?? "-";
    const away = score.halfTime?.away ?? "-";
    return `${home} — ${away}`;
  }
  const home = score.fullTime?.home ?? "-";
  const away = score.fullTime?.away ?? "-";
  return `${home} — ${away}`;
};

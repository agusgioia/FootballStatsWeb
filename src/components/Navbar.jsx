import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/matches", label: "Partidos" },
    { to: "/standings", label: "Posiciones" },
    { to: "/scorers", label: "Goleadores" },
    { to: "/live", label: "En Vivo", hasBadge: true },
  ];

  return (
    <nav className="bg-[#0f1117] border-b border-white/8 h-14 flex items-center justify-between px-6">
      <Link
        to="/"
        className="flex items-center gap-2 text-white font-medium text-[17px]"
      >
        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-sm">
          ⚽
        </div>
        Arg<span className="text-blue-500">Stats</span>
      </Link>

      <div className="flex items-center gap-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
              pathname === link.to
                ? "text-white bg-blue-600/20"
                : "text-white/50 hover:text-white hover:bg-white/[0.07]"
            }`}
          >
            {link.label}
            {link.hasBadge && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-3"></span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

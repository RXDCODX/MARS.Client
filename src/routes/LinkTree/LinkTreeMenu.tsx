import { Link } from "react-router-dom";
import "./LinktreeMenu.css"; // Стили (можно заменить на Tailwind или styled-components)

export const LinktreeMenu = () => {
  const links = [
    { path: "/pyroalerts", name: "Pyro Alerts" },
    { path: "/randommem", name: "RandomMem" },
    { path: "/waifu", name: "Waifu Alerts" },
    { path: "/fumofriday", name: "Fumo Friday" },
    { path: "/highlite", name: "Highlite Message" },
    { path: "/confetti", name: "Confetti Manager" },
    { path: "/chath", name: "Horizontal Chat" },
    { path: "/chatv", name: "Vertical Chat" },
    { path: "/sr/currenttrack", name: "SR: Current Track" },
  ];

  return (
    <div className="linktree-container">
      <h1>Choose a Component</h1>
      <div className="links-grid">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className="link-card">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

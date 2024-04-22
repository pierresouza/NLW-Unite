import NlrUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLinks } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={NlrUniteIcon} alt="" />
      <nav className="flex items-center gap-5 ">
        <NavLinks href="/eventos">Eventos</NavLinks>
        <NavLinks href="/participantes">Participantes</NavLinks>
      </nav>
    </div>
  );
}

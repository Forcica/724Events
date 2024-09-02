/* eslint-disable no-return-assign */
import { Link } from "react-scroll";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <Link to="nos-services" smooth duration={500} style={{ cursor: 'pointer' }}>
          Nos services
        </Link>
      </li>
      <li>
        <Link to="nos-realisations" smooth duration={500} style={{ cursor: 'pointer' }}>
          Nos réalisations
        </Link>
      </li>
      <li>
        <Link to="notre-equipe" smooth duration={500} style={{ cursor: 'pointer' }}>
          Notre équipe
        </Link>
      </li>
    </ul>
    <Button title="contact" onClick={() => (window.document.location.hash = "#contact")}>
      Contact
    </Button>
  </nav>
);

export default Menu;

import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      <div className={classes.logo}>TALK TO ME</div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/" className={classes.link}>
                Se connecter
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile" className={classes.link}>
                Profil
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className={classes.logout}>Se déconnecter</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

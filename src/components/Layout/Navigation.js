import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>TALK TO ME</div>
      <nav>
        <ul>
          <li>Se connecter</li>
          <li>Profil</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;

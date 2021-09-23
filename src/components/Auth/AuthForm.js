import React, { useCallback, useEffect, useRef, useState } from 'react';

import Card from '../UI/Card';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  //const [error, setError] = useState(null);

  const pseudoInputRef = useRef('vide');
  const emailInputRef = useRef("vide");
  const passwordInputRef = useRef("vide");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
  console.log('authform.js')
  const enteredPseudo = pseudoInputRef.current.value;
  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;

  fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1wW5QqVrmwLZxzFRvFDv8CnIgnQEGWfI", {
    method: "POST",
    body: JSON.stringify({
      pseudo: enteredPseudo,
      email: enteredEmail,
      password: enteredPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (response.ok) {
      console.log('succès!')
    } else {
      console.log('echec');
    }
  })
  .catch((error) => {
    console.log(error);
  });
  };

  return (
    <section className={classes.auth}>
      <Card>
        <form onSubmit={submitHandler}>
          <h1>{isLogin ? "Se connecter" : "S'inscrire"} </h1>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="pseudo">Votre Pseudo</label>
              <input type="text" id="pseudo" ref={pseudoInputRef} />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="email">Votre Email</label>
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Votre Mot de Passe</label>
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
          <div className={classes.action}>
            <button className={classes.button}>{isLogin ? "Se connecter" : "Créer un compte"}</button>
            <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
              {isLogin ? "Créer un compte" : "Se connecter avec un compte existant"}
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
}

export default AuthForm;
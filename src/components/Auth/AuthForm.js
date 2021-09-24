import React, { useState, useContext } from "react";

import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  console.log('AuthForm.js');

  const authCtx = useContext(AuthContext);

  const [hasAnAccount, setHasAnAccount] = useState(true);
  const switchAuthModeHandler = () => {
    setHasAnAccount((prevState) => !prevState);
  };

  const [enteredEmail, setEnteredEmail] = useState('');
  //const enteredEmailIsValid = enteredEmail.includes('@');

  const [enteredPassword, setEnteredPassword] = useState("");
  //const enteredPasswordIsValid = enteredPassword.trim() !== '';

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    let url;
    if (hasAnAccount) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1wW5QqVrmwLZxzFRvFDv8CnIgnQEGWfI";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1wW5QqVrmwLZxzFRvFDv8CnIgnQEGWfI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <section className={classes.auth}>
      <Card>
        <form onSubmit={submitHandler}>
          <h1>{hasAnAccount ? "Se connecter" : "S'inscrire"} </h1>
          <div className={classes["form-control"]}>
            <label htmlFor="email">Votre Email</label>
            <input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} required />
          </div>
          <div className={classes["form-control"]}>
            <label htmlFor="password">Votre Mot de Passe</label>
            <input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} required />
          </div>
          <div className={classes.action}>
            <button className={classes.button}>{switchAuthModeHandler ? "Se connecter" : "Créer un compte"}</button>
            <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
              {hasAnAccount ? "Créer un compte" : "Se connecter avec un compte existant"}
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default AuthForm;
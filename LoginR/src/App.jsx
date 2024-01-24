import { Form } from "./components/Form/Form";
import { InputField } from "./components/inputField/inputField";
import signUpController from "../src/controller/signUpController.json";
import signInController from "../src/controller/signInController.json";
import { useState, useContext } from "react";
import UserData from "./components/User/UserData"
import { UserContext } from "./components/context/UserContext"; 


function App() {
  const [message, setMessage] = useState();
  const [isSignIn, setIsSignIn] = useState(true);
  const { setUserData } = useContext(UserContext);

  const signUp = (e) => {
    e.preventDefault();
    let url = "http://localhost:8081/sign-up";

    let body = new URLSearchParams();
    body.append("name", e.target.name.value);
    body.append("email", e.target.email.value);
    body.append("password", e.target.password.value);
    console.log(body.forEach((value) => console.log(value)));

    let options = {
      method: "POST",
      body: body,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  };

  /* console.log(user); */

  const signIn = (e) => {
    e.preventDefault();
    let url = "http://localhost:8081/sign-in";
    let body = new URLSearchParams();
    body.append("email", e.target.email.value);
    body.append("password", e.target.password.value);

    let options = {
      method: "POST",
      body: body,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  };

  return (
    <>
      <button onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? "Sign in" : "Sign up"}
      </button>
      <Form submitAction={isSignIn ? signIn : signUp}>
        <p>{isSignIn ? "Sign in" : "Sign up"}</p>
        {message && <b>{message}</b>}
        {isSignIn
          ? signInController.form.map((input, i) => {
              return (
                <InputField
                  key={i}
                  placeholder={input.placeholder}
                  name={input.name}
                  type={input.type}
                  labelText={input.labelText}
                  text={input.text}
                />
              );
            })
          : signUpController.form.map((input, i) => {
              return (
                <InputField
                  key={i}
                  placeholder={input.placeholder}
                  name={input.name}
                  type={input.type}
                  labelText={input.labelText}
                  text={input.text}
                />
              );
            })}
      </Form>
      <UserData />
    </>
  );
}

export default App;
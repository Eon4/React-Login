import { Form } from "./components/Form/Form";
import { InputField } from "./components/inputField/inputField";
import signUpController from "../src/controller/signUpController.json";
import signInController from "../src/controller/signInController.json";
import { useState, useContext } from "react";
import UserData from "./components/User/UserData"
import { userContext } from "./components/context/UserContext"; 


function App() {
  const [message, setMessage] = useState();
  const [isSignIn, setIsSignIn] = useState();
  const [data, setData] = useState(null);

  const {setUserData} = useContext(userContext);

  const signUp = (e) => {
    e.preventDefault();
    let url = "http://localhost:8081/sign-up";

    let body = new URLSearchParams();
    body.append("name", e.target.name.value);
    body.append("email", e.target.email.value);
    body.append("password", e.target.password.value);

    let option = {
      method: "POST",
      body: body,
    };

    fetch(url, option)
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }

  const signIn = (e) => {
    e.preventDefault();
    let url = "http://localhost:8081/sign-in";

    let body = new URLSearchParams();
    body.append("email", e.target.email.value);
    body.append("password", e.target.password.value);

    let option = {
      method: "POST",
      body: body,
    };

    fetch(url, option)
      .then((res) => res.json())
      .then((data) => setData(data)) 
      .catch((err) => console.log(err));
  }

  console.log("sign in", data);

  return (
    <div>
      <button onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? "Sign in " : "Sign up"}
      </button>

      <Form submitAction={isSignIn ? signIn : signUp}>
        <p>{isSignIn ? "Sign in" : "Sign up"}</p>
        {message && <b>{message}</b>}

        {!isSignIn
          ? signUpController.form.map((input, index) => (
              <InputField
                key={index}
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                labelText={input.labelText}
                text={input.text}
              />
            ))
          : signInController.form.map((input, i) => (
              <InputField
                key={i}
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                labelText={input.labelText}
                text={input.text}
              />
            ))}
      </Form>


      <UserData/>
    </div>
  );
}

export default App;

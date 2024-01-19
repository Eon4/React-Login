// import './App.css'
import { Form } from "./components/Form/Form";
import { InputField } from "./components/inputField/inputField";
import signUpController from "../src/controller/signUpController.json";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState();

  const signUp =(e)=>{
  e.preventDefault()
  let url ="http://localhost:8081/sign-up"
  
  let body = new URLSearchParams();
  body.append("name",e.target.name.value)
  body.append("email",e.target.email.value)
  body.append("password",e.target.password.value)
  
  let option = {
    method: "POST",
    body: body,
  }
  
  fetch( url,option) 
  .then((res)=>res.json()) 
  .then((data)=> setMessage(data)) 
  .catch((err)=>console.log(err)); 
}

  
      return (
        <Form submitAction={signUp}>
          {message && <b>{message}</b>}
          {signUpController.form.map((input,index) => (
            <InputField
              key={index}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              labelText={input.labelText}
              text={input.text}
            />
          ))}
        </Form>
      );
    }
    
    export default App;
//Dynamisk inout field med props som kan være alle slags input fields
//Komponent der samler de inpit field i en form og en submit funktion
//
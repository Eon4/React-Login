
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { InputField } from "../inputField/inputField";
import { Form } from "../Form/Form";

export const UserData = () => {
  const { userData } = useContext(UserContext);

  const sendMessage = (e) => {
    e.preventDefault();
    const url = "http://localhost:8081/message/create";
    const body = new URLSearchParams();
    body.append("message", e.target.message.value);
    let options = {
      method: "POST",
      body: body,
      headers: {
        Authorization: "Bearer " + userData.accessToken,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <section>
      {userData && (
        <>
          <p>Name: {userData?.name}</p>
          <p>Email: {userData?.email}</p>

          <Form submitAction={(e) => sendMessage(e)}>
            <InputField
              type="textfield"
              placeholder="Enter message"
              name="message"
            />
            <InputField type="submit" value="Send message" />
          </Form>
        </>
      )}
    </section>
  );
};

export default UserData;

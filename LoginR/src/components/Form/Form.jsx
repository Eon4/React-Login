import style from "../Form/Form.module.scss";

// export const Form = (props) => {
//   return <form className={style.formStyle} onSubmit={(e) => props.submitAction(e)}>{props.children}</form>;
// };


export const Form = (props) => {
  return (
    <form
      className={style.formStyle}
      onSubmit={(event) => props.submitAction(event)}
    >
      {props.children}
    </form>
  );
};
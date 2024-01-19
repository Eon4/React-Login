import style from "../InputField/inputField.module.scss";

export const InputField = (props) => {
  return (
    <>
      {props.labelText && (
        <label className={style.labelStyle}>{props.labelText}</label>
      )}

      {props.type === "submit" ? (
        <input 
        className={style.inputStyle}
        type={props.type}
        value={props.text}
        ></input>

      ): ( 

      <input
        className={style.inputStyle}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
      ></input>
      )}
      </>
  );
};
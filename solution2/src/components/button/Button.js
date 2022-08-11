import classes from "./Button.module.scss"

export const Button = (props) => {
  return (
    <button
      className={classes.btn}
      onClick={props.onClick}
      disabled={props.loading}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  )
}

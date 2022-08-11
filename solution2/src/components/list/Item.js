import classes from "./list.module.scss"

export const Item = (props) => {
  return <div className={classes.item}>{props.title}</div>
}

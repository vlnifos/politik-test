import { Item } from "./Item"
import classes from "./list.module.scss"

export const List = (props) => {
  const renderList = () => {
    return props.items.map((x) => (
      <Item key={x.id} title={`${x.id} ${x[props.titleProp]}`} />
    ))
  }

  return (
    <div className={classes.list}>
      <div className={classes.title}>{props.title}</div>
      {renderList()}
    </div>
  )
}

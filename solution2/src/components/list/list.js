import { Item } from "./Item"

export const List = (props) => {
  const renderList = () => {
    return props.items.map((x) => (
      <Item key={x.id} title={`${x.id} ${x.firstName}`} />
    ))
  }

  return <div>{renderList()}</div>
}

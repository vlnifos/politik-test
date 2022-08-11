export const Button = (props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  )
}
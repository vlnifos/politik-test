import classes from "./Select.module.scss"

export const Select = (props) => {
  const renderOptions = () => {
    return props.options.map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ))
  }
  return (
    <select
      className={classes.select}
      onChange={(el) => props.onChange(el.target.value)}
    >
      {renderOptions()}
    </select>
  )
}

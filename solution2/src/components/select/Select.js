export const Select = (props) => {
  const renderOptions = () => {
    return props.options.map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ))
  }
  return (
    <select onChange={(el) => props.onChange(el.target.value)}>
      {renderOptions()}
    </select>
  )
}

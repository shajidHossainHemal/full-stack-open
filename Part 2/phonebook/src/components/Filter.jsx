const Filter = ({ onValueChange }) => {
  return (
    <form>
      <div>filter shown with <input onChange={onValueChange} /></div>
    </form>
  )
}

export default Filter
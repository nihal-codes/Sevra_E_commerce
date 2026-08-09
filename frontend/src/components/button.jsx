const Button = ({name, onClick}) => {
  return (
    <>
      <button onClick={onClick} 
      className="
      border rounded-lg text-center shadow-lg w-30
      transition-all duration-150 hover:-translate-y-px active:scale-102 p-1
      ">
        {name}
      </button>
    </>
  )
}

export default Button;
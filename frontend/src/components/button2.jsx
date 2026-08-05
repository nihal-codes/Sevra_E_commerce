const Button = ({name, onClick}) => {
  return (
    <>
      <button onClick={onClick} 
      className="
      text-center rounded-full
      bg-(--oatmeal) px-2 py-1
      transition-all duration-150 hover:-translate-y-px active:scale-102 
      focus:bg-linear-to-br from-(--ablue) via-(--fblue) to-(--ablue) focus:text-white focus:rounded-full focus:shadow-lg
      ">
        {name}
      </button>
    </>
  )
}

export default Button;
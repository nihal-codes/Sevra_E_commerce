const DialogBox = ({children}) => {
  return (
    <>
      <div className="
      absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      flex flex-col
      items-center
      justify-center
      border border-(--oatmeal)
      bg-(--bg)
      p-4
      rounded-lg
      opacity-100
      text-black
      gap-4
      ">
        {children}
      </div>
    </>
  )
}

export default DialogBox;
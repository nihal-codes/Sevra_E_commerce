export default function NavButton ({name, onClick, onMouseOver, onMouseLeave}) {
  return (
    <>
      <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseLeave}
      className="px-3 py-1 w-26 rounded-full shadow border border-(--truffle)/20 transition-all duration-200 hover:bg-(--truffle)/20"
      >
        {name}
      </button>
    </>
  )
}
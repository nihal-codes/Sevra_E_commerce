const Utility = ({title, items, viewPage, setViewPage}) => {

  return (
    <>
      <div className="flex flex-col mb-6">
        <h3 className="text-xs mb-3 uppercase">{title}</h3>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button key={item.name} onClick={() => setViewPage(item.onClick)} className={viewPage === item.onClick ?"flex items-center rounded-lg gap-4 cursor-pointer transition-all duration-200 bg-(--oatmeal)/50 px-2 py-1" : "flex items-center rounded-lg gap-4 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1"}>
              <i className={`${item.icon} `}></i>
              <h2 className="text-sm font-semibold">{item.name}</h2>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Utility;
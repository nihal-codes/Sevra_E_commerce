const ProductTag = ({icon, name, value}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <i className={`${icon} font-thin text-2xl bg-(--oatmeal) rounded-full text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
        <h2 className="text-xs font shrink-">
          <span className="font-semibold">{name}</span>
          <br />
          {value}
        </h2>
      </div>
    </>
  )
}

export default ProductTag;  
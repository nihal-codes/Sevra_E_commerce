const ProductTag = ({icon, name, value}) => {
  return (
    <>
      <div className="flex items-center ">
        <i className={`${icon} font-thin text-3xl`}></i>
        <h2 className="text-sm">
          <span className="">{name}</span>
          <br />
          {value}
        </h2>
      </div>
    </>
  )
}

export default ProductTag;  
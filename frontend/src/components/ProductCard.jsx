const ProductCard = ({image, name, brand, rating, price, onClick}) => {
  return (
    <>
      <div className="flex gap-6 border p-2 rounded-lg border-(--oatmeal) shadow-lg " onClick={onClick}>
        <div className="">
          <img src={image} alt={name} className="h-40 w-32 rounded"/>
        </div>
        <div className="flex flex-col gap-2 items-start ">
          <h1 className="text-lg">{name}</h1>
          <h2 className="text-sm">{brand}</h2>
          <h2 className="text-xl">{price}</h2>
          <button className="border rounded p-1">Add to Cart</button>
        </div>
      </div>
    </>
  )
}

export default ProductCard;

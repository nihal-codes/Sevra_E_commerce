const ProductCard3 = ({image, name, brand, price, quantity, status, stock, minOrderQuantity, onClick}) => {

  const total = price * quantity;

  return (
    <>
      <div className="grid grid-cols-[6fr_3fr_2fr_3fr_1fr] items-center p-3 ">
        <div className="flex items-center gap-6">
          <img src={image} alt={name} className="h-20 w-20 rounded-lg"/>
          <div className="flex flex-col">
            <h2 className="font-semibold">{name}</h2>
            <h2 className="text-sm">{brand}</h2>          
          </div>
        </div>

        <div className="flex items-center p-1 w-30 justify-center px-3 mr-8">
          <h2 className="text-(--ablue) text-lg ">{quantity}</h2>
        </div>

        <div>
          <h1 className="">₹{total}</h1>
        </div>

        <div>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            status === "Delivered"
              ? "text-green-600 bg-green-100"
              : "text-(--fblue) bg-(--oatmeal)"
          }`}>
            {status}
          </span>
        </div>

        <div>
          <button 
          onClick={onClick}
          className="border w-8 h-8 rounded-full border-(--truffle) hover:bg-(--light)/40">
            <i className="ri-close-line"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductCard3;
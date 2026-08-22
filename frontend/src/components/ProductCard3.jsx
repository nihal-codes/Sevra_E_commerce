const ProductCard3 = ({image, name, brand, price, quantity, status, stock, minOrderQuantity, onClick}) => {

  const total = price > 500 ? ((price * quantity) + price * 0.03) : ((price * quantity) + (price * 0.03) + 80);

  return (
    <>
      <div className="grid grid-cols-[3fr_3fr_3fr_3fr_1fr] lg:grid-cols-[6fr_3fr_2fr_3fr_1fr] items-center py-2 lg:p-3 ">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
          <img src={image} alt={name} className="h-20 w-20 rounded-lg"/>
          <div className="flex flex-col">
            <h2 className="font-semibold">{name}</h2>
            <h2 className="text-sm hidden lg:block">{brand}</h2>          
          </div>
        </div>

        <div className="flex items-center lg:p-1 lg:w-30 justify-center lg:px-3 -ml-4 lg:-ml-8">
          <h2 className="text-(--ablue) text-lg ">{quantity}</h2>
        </div>

        <div>
          <h1 className="-ml-4 lg:-ml-4">₹{total}</h1>
        </div>

        <div>
          <span className={`text-sm font-medium px-2 py-1 -ml-4 lg:-ml-2 rounded-full ${
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
          className="border w-8 h-8 rounded-full -ml-3 lg:ml-3 border-(--truffle) hover:bg-(--light)/40">
            <i className="ri-close-line"></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductCard3;
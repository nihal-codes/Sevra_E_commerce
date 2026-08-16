const ProductCart2 = ({image, name, brand, price, quantity, stock, minOrderQuantity, onClick}) => {
  
  const incrementQuantity = () => {
    if (quantity >= stock){
      toast.error("Minimum Quantity Reached")
      return  
    } 
    quantity = quantity + 1;
    console.log(quantity)
  }

  const decrementQuantity = () => { 
    if (quantity <= minOrderQuantity){
      toast.error("Maximum Quantity Reached")
      return  
    } 
    quantity -= 1;
  }

  return (
    <>
      <div className="grid grid-cols-[6fr_3fr_3fr_1fr] items-center p-3 ">
        <div className="flex items-center gap-6">
          <img src={image} alt={name} className="h-20 w-20 rounded-lg"/>
          <div className="flex flex-col">
            <h2 className="font-semibold">{name}</h2>
            <h2 className="text-sm">{brand}</h2>          
          </div>
        </div>

        <div className="flex items-center gap-5 bg-(--bg)/2 0 border border-(--truffle) rounded-lg p-1 w-30 justify-center px-3 mr-8">
          <button onClick={() => decrementQuantity()}><i className="ri-subtract-line text-lg"></i></button>
          <h2 className="text-(--ablue) text-lg ">{quantity}</h2>
          <button onClick={() => incrementQuantity()}><i className="ri-add-line text-lg"></i></button>
        </div>

        <div>
          <h1 className="font-bold text-lg">₹{price}</h1>
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

export default ProductCart2;

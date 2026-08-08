import StarRating from "./StarRating";

const ProductCard = ({image, name, brand, rating, price, onClick, children, role}) => {
  
  return (
    <>
      <div className="flex items-end gap-6 border p-3 rounded-xl border-(--oatmeal) shadow-lg bg-linear-to-r from-(--bg)  to-(--oatmeal)" onClick={onClick}>
        <div className="">
          <img src={image} alt={name} className="h-42 w-40 rounded-lg"/>
        </div>
        <div className="flex flex-col gap-2 items-start ">
          <h1 className="text-xl font-bold text-(--ablue)">{name}</h1>
          <h2 className="text-sm text-(--ablue) font-semibold">{brand}</h2>
          <StarRating rating={rating}/>
          <h2 className="text-xl font-bold text-(--truffle) "><span>₹</span> {price}</h2>
          {role === "user" && <button 
          className="rounded-lg py-2 px-10 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) ">
            <i className="ri-shopping-cart-2-line"></i> Add to Cart</button>}
          {children}
        </div>
      </div>
    </>
  )
}

export default ProductCard;

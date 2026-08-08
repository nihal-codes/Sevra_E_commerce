import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

const Cart = () => {

  const [savedCartOrders, setSavedCartOrders ] = useState([])
  const [products, setProducts               ] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const getCartOrders = async() => {
    try {
      const response = await api.get("/cart")
      setSavedCartOrders(response.data.cartOrders)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }

  const getProducts = async() => {
    try {
      const response = await api.get("/products")
      setProducts(response.data.products)
    }
    catch (err) {
      setRole(err.response.data.role)
    }
  }
  
  useEffect(() => {
    getCartOrders()
    getProducts()
  },[])

  const filterProducts = () => {

    for (let i = 0; i < savedCartOrders.length; i++) {
      setFilteredProducts(prev => [
        ...prev,
        ...products.filter(product => product._id === savedCartOrders[i].productId)
      ])
    }
  }
  useEffect(() => {
    filterProducts();
  }, [products, savedCartOrders])

  return (
    <>
      <div>
        {filteredProducts.map(product => (
          <div key={product._id} className="flex gap-4 p-2 w-fit">
            <ProductCard 
              image={product.image}
              name={product.name}
              brand={product.brand}
              price={product.price}
              rating={product.rating}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Cart;
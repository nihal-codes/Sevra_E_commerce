import { useEffect, useState } from "react";
import api from "../api/api";
import Button from "../components/button";
import toast from "react-hot-toast";

const Buy = ({productId, userId, quantity, oldStock, setBuyWindow}) => {
  const [location, setLocation ] = useState("")
  const [fetchedLocations, setFetchedLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  
  const updateStock = async () => {
    if (oldStock-quantity < 0){
      toast.error("Cant Place order")
      return
    }
    try {
      const response = await api.put(`/products/${productId}`, {
        stock: oldStock-quantity
      })
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const placeOrder = async() => {
    if (oldStock-quantity < 0){
      toast.error("Cant Place order")
      return
    }
    try {
      const response = await api.post("/order", 
        {
          userId: userId,
          productId: productId,
          location: selectedLocation ? selectedLocation : location,
          quantity: quantity,
        }
      )
      console.log(response.data)
      updateStock();
      setBuyWindow(false)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const fetchLocations = async () => {
    try {
      const response = await api.get(`/users/${userId}`)
      setFetchedLocations(response.data.locations)

    } catch (err) {
      console.log(err.response?.data)
    }
  }
  useEffect(() => {
    fetchLocations();
  }, []);
  
  return (
    <>
      <div className=" p-4 w-fit gap-4 rounded-lg flex flex-col justify-center">
        
        <div className="flex flex-col gap-2">
          <h2 className="text-">Order to a previous location</h2>
          <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className=" border w-fit border-(--oatmeal) shadow p-1 rounded-lg outline-none">
            <option value="" className="bg-(--bg) text-(--ablue)">Existing Location</option>
            {fetchedLocations.map(location => (
              <option key={location} value={location} className="border border-(--oatmeal) bg-(--bg) focus:bg-(--truffle) ">{location}</option>
            ))}
          </select>

          <h2 className="text-center mt-2">OR</h2>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className={selectedLocation ? "opacity-40" : ""}>Enter a new Location</h2>
          <input type="text" id="location" autoComplete="something" disabled={selectedLocation} value={location} placeholder="Enter new location" onChange={(e) => setLocation(e.target.value)} className={selectedLocation ? "border p-1 rounded border-(--oatmeal) shadow outline-none opacity-40" : "border p-1 rounded border-(--oatmeal) shadow outline-none"}/>
        </div>
        <Button name="Place Order" onClick={() => {placeOrder(); ;}}/>
      </div>
    </>
  )
}

export default Buy;
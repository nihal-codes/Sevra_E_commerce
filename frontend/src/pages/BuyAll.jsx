import { useEffect, useState } from "react";
import api from "../api/api";
import Button from "../components/button";
import toast from "react-hot-toast";

const BuyAllCart = ({ setBuyWindow }) => {

  const [location, setLocation] = useState("");
  const [fetchedLocations, setFetchedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLocations = async () => {
    try {

      const response = await api.get("/users/me");

      setFetchedLocations(response.data.locations);

    } catch (err) {

      console.log(err.response?.data);

    }
  };

  const placeOrder = async () => {

    const finalLocation = selectedLocation || location;

    if (!finalLocation.trim()) {
      toast.error("Please select or enter a location");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post("/order/all", {
        location: finalLocation
      });

      toast.success(response.data.message);

      setBuyWindow(false);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Unable to place order"
      );

      console.log(err.response?.data);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="p-4 w-fit gap-4 rounded-lg flex flex-col justify-center">

      <div className="flex flex-col gap-2">

        <h2>
          Order to a previous location
        </h2>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border w-fit border-(--oatmeal) shadow p-1 rounded-lg outline-none"
        >

          <option value="">
            Existing Location
          </option>

          {fetchedLocations.map((location) => (

            <option
              key={location}
              value={location}
            >
              {location}
            </option>

          ))}

        </select>

        <h2 className="text-center mt-2">
          OR
        </h2>

      </div>

      <div className="flex flex-col gap-2">

        <h2 className={selectedLocation ? "opacity-40" : ""}>
          Enter a new Location
        </h2>

        <input
          type="text"
          disabled={!!selectedLocation}
          value={location}
          placeholder="Enter new location"
          onChange={(e) => setLocation(e.target.value)}
          className={
            selectedLocation
              ? "border p-1 rounded border-(--oatmeal) shadow outline-none opacity-40"
              : "border p-1 rounded border-(--oatmeal) shadow outline-none"
          }
        />

      </div>

      <Button
        name={loading ? "Placing Order..." : "Place Order"}
        onClick={placeOrder}
      />

    </div>
  );
};

export default BuyAllCart;
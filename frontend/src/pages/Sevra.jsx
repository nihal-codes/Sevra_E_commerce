import Category from "../components/Category"
import SubCategory from "../components/SubCategory"
import Product from "../components/Product"
import UserHeader from "./UserHeader"
import { useState } from "react"

const Sevra = () => {
  const [filter, setFilter ]  = useState("")

  return (
    <>
      <div className="flex flex-col gap-6 bg-(--bg) min-h-screen">
        <UserHeader />
        <Category filter={filter} setFilter={setFilter} />
        <SubCategory filter={filter} setFilter={setFilter} />
        <Product />
      </div>
    </>
  )
}
export default Sevra;
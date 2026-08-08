import Category from "../components/Category"
import SubCategory from "../components/SubCategory"
import Product from "../components/Product"
import UserHeader from "./UserHeader"
import { useState } from "react"

const Home = () => {
  const [clearFilter, SetClearFilter ]  = useState("")

  const handleClearFilter = () => {
    SetClearFilter(true)
  }

  return (
    <>
      <div className="flex flex-col gap-6 bg-(--bg)">
        <UserHeader />
        <Category />
        <SubCategory />
        <Product />
      </div>
    </>
  )
}
export default Home
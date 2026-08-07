import Category from "../components/Category"
import SubCategory from "../components/SubCategory"
import Product from "../components/Product"
import UserHeader from "./UserHeader"

const Home = () => {


  return (
    <>
      <div className="flex flex-col gap-4 bg-(--bg)">
        <UserHeader />
        <Category />
        <SubCategory />
        <Product />
      </div>
    </>
  )
}
export default Home
import Category from "../components/Category"
import SubCategory from "../components/SubCategory"
import Product from "../components/Product"
import UserHeader from "./UserHeader"

const Home = () => {


  return (
    <>
      <UserHeader />
      <Category />
      <SubCategory />
      <Product />
    </>
  )
}
export default Home
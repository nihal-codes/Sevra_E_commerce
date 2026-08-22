const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

require("dotenv").config()

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoute");
const subCategoryRoutes = require("./routes/subCategoryRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute")
const cartRouter = require("./routes/cartRoutes")
const orderRouter = require("./routes/orderRoute")
const userRouter = require("./routes/userRoutes")

const app = express()

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_API_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/subcategories", subCategoryRoutes);
app.use("/products", productRouter);
app.use("/reviews", reviewRouter);
app.use("/cart", cartRouter)
app.use("/order", orderRouter)
app.use("/users", userRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
})
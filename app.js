import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js"
import userRoute from "./routes/userRoute.js"






const app = express();
app.use(express.json())
app.use(cors())


//DB CONNECTION
connectDB();


//ROUTES
app.use("/api/user",userRoute)
app.use("/api/product",productRoute)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`))
import express from "express"
import { addProduct, deleteProductByID, getListProducts, updateProduct } from "../controllers/productController.js"
import authAdmin from "../middleware/authAdmin.js"


const router = express.Router();

router.post('/create',authAdmin,addProduct)
    .get('/all',getListProducts)
    .put('/:id',authAdmin,updateProduct)
    .delete('/:id',authAdmin,deleteProductByID)



export default router;
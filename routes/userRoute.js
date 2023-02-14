import express from "express"
import { register,login } from "../controllers/loginController.js"

const router = express.Router();

router.post('/login',login)
      .post('/register',register)
   


export default router;
import jwt from "jsonwebtoken";
import { User } from "../config/db.js";
import { jwt_Key } from "../baseUrl.js";

const authAdmin = async (req, res, next) => {
  // Get token from header
  let token = req.header("token");
  try {
    if (!token) {
      res.status(401).json({ Message: "Not authorized, no token" });
    } else {
      // Verify token
      const decoded = jwt.verify(token,jwt_Key);
      // Get user from the token
      let user =  await User.findOne({ where: { id: decoded.id } });
      if (user.isAdmin) {
        next();
      } else {
        res.status(401).json({ Message: "Not authorized" });
      }
    }
  } catch (error) {
    res.status(401).json({ Message: "Not authorized" });
  }
};

export default authAdmin;
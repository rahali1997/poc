import { jwt_Key, expireDate } from "../baseUrl.js";
import { User } from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// @Desc Authenticate User
const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ where: { userName: userName } });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                username: user.userName,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ Message: "Informations Invalids" });
        }
    } catch (err) {
        res.status(500).json({ Message: "server Error" });
    }
};


const register = async (req, res) => {
    const {
        userName,
        password
    } = req.body;

    try {
        let checkExist = await User.findOne({ where: { userName: userName } });
        if (checkExist) {
            res.status(400).json({ Message: "Utilisateur exist déja" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                userName: userName,
                password: hashedPassword,
                isAdmin: false
            });
            res.json({
                username: user.userName,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });
        }
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }

};


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, jwt_Key, {
        expiresIn: expireDate,
    });
};


export { register, login }

const jwt = require("jsonwebtoken");

const createToken = (userId,role,email) => {
    return jwt.sign(
        { userId: userId,role:role,email:email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
}


module.exports = {createToken}
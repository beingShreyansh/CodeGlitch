const jwt = require('jsonwebtoken');

const JWT_Secret = "Shreyansh";

const generateToken = (id,name,email)=>{
    return jwt.sign({id,name,email},JWT_Secret,{
        expiresIn:"30d"
    })
}

module.exports = generateToken;
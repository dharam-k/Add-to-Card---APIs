import jwt from "jsonwebtoken";

const generateToken = (data : Object)=>{
    const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
    const token = jwt.sign(data, JWT_SECRET, {expiresIn:'1d'});
    return token;
}

export default generateToken
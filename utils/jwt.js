import jwt from 'jsonwebtoken';


export const generateJwtToken = (payload)=>{
    const JWT_SECRET = process.env.JWT_SECRET;
    
    return jwt.sign(payload,JWT_SECRET,{expiresIn:'1d'});
};

export const verifyToken = (token)=>{
    return jwt.verify(token,JWT_SECRET);
}
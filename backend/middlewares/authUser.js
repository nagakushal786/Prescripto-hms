import jwt from "jsonwebtoken";

export const userAuthentication=async (req, res, next)=> {
    try{
        const {utoken}=req.headers;
        if(!utoken){
            return res.status(400).json({
                success: false,
                message: "User not authorized, please login!"
            });
        }

        const decodedToken=jwt.verify(utoken, process.env.USER_JWT_SECRET_KEY);
        req.body.userId=decodedToken.id;

        next();
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}
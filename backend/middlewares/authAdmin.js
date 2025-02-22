import jwt from "jsonwebtoken";

export const adminAuthentication=async (req, res, next)=> {
    try{
        const {atoken}=req.headers;
        if(!atoken){
            return res.status(400).json({
                success: false,
                message: "Admin not authorized!"
            });
        }

        const decodedToken=jwt.verify(atoken, process.env.JWT_SECRET_KEY);
        if(decodedToken.email!==process.env.ADMIN_EMAIL && decodedToken.password!==process.env.ADMIN_PASSWORD){
            return res.status(400).json({
                success: false,
                message: "Admin not authorized!"
            });
        }

        next();
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}
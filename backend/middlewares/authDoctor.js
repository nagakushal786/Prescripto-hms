import jwt from "jsonwebtoken";

export const doctorAuthentication=async (req, res, next)=> {
    try{
        const {dtoken}=req.headers;
        if(!dtoken){
            return res.status(400).json({
                success: false,
                message: "Doctor not authorized, please login!"
            });
        }

        const decodedToken=jwt.verify(dtoken, process.env.JWT_SECRET_KEY);
        req.body.docId=decodedToken.id;

        next();
    }catch(err){
        return res.status(400).json({
            message: err.message || err,
            error: true
        });
    }
}
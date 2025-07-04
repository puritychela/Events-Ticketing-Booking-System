//file which enable you to hit the end point only if you are admin
//to do this we should have
//1 authentication function





import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import dontenv from "dotenv";


dontenv.config()

declare global{
    namespace Express{
        interface Request{
            user:any;
        }
    }
}
type DecodedToken = {
    userId:number,
    email: string,
    role: string,
    firstname: string,
    lastname: string,
    exp: number
}
export const verifyToken = (token:string,secret:string) =>{
    try{
        const decoded = jwt.verify(token,secret) as DecodedToken
        return decoded;
    }catch(error){
        return null;

    }
}

//2 authorazation middleware: responsible for ensuring that the the endpoint the user  is hitting is aloud to hit that end point
export const authMiddlewre = async(req:Request,res:Response,next:NextFunction,requiredRoles:string)=>{

    const token = req.header("authorization")
    if(!token){
        res.status(401).json({error:"authorazation header is missing"});
        return;
    }
    const decodedToken = await verifyToken(token,process.env.JWT_SECRET as string)
    if(!decodedToken){
        res.status(401).json({error:"invalid or expired token"})
        return;
    }
    const role = decodedToken?.role;
    if(requiredRoles === "both" && (role === "admin" || role === "user")){
        if(decodedToken?.role === "admin" || decodedToken?.role ==="user"){
            req.user === decodedToken;
            next ();
            return;
        }
    }else if(role === requiredRoles){
        req.user === decodedToken;
        next();
        return;

    }else{
        res.status(403).json({error:"forbidden: you do not have permission to access this resource"})
        return;

    }
}

//how to call the middleware to check if the user is  admin
export const adminRoleAuth = async(req:Request,res:Response,next:NextFunction) =>{
    await authMiddlewre(req,res,next,"admin")
}
export const userRoleAuth = async(req:Request,res:Response,next:NextFunction) =>{
    await authMiddlewre(req,res,next,"user")
}
export const authRoleAuth = async(req:Request,res:Response,next:NextFunction) =>{
    await authMiddlewre(req,res,next,"both")
}
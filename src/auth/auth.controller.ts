import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { createUserServices, getUserByEmailService } from "./auth.service";
import Jwt  from "jsonwebtoken";


//register login
export const createUser = async (req:Request,res:Response) =>{
    try{
        const user  = req.body;
        //console .log("🚀 ~ createUser ~ user:",user)

  if (!user.firstname || !user.lastname || !user.email || !user.password) {
    res.status(400).json({ error: "Firstname, lastname, email, and password are required" });
    return;
  }
  //generate hashed password 
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password,salt)
//   console.log("🚀~  createUser ~ hashedPassword:", hashedPassword )
 

  user.password = hashedPassword

  const newUser = await createUserServices(user)
  res.status(201).json({message:newUser})

    }catch(error:any){
        res.status(500).json({error: error.message || "failed to create user"});

    }
}

//logics for logins
export const loginUser = async(req: Request, res: Response)=>{
  const user = req.body;
   try{
    if (!user.email || !user.password) {
     res.status(400).json({ error: "Email and password are required" });
     return;
    }
  const existingUser = await getUserByEmailService(user.email)
 
    if (!existingUser || !existingUser.password) {
     res.status(404).json({ error: "User not found or missing password" });
     return;
    }
  //if user is found now we compare now the password
  const isMatch = bcrypt.compareSync(user.password,existingUser.password)
  if(!isMatch){
    res.status(401).json({error:"Invalid password"});
    return;
  }
  //generate the token now
  let payload = {
    userId: existingUser.userId,
    email: existingUser.email,
    firstname: existingUser.firstname,
    lastname: existingUser.lastname,
    role: existingUser.role,


    //expiry payload token
    exp: Math.floor(Date.now()/1000)+(60*60)
  }
  let secret = process.env.JWT_SECRET as string;
  const token = Jwt.sign(payload,secret)


  res.status(200).json({token,userId:existingUser.userId,email:existingUser.email,firstname:existingUser.firstname,lastname:existingUser.lastname,role:existingUser.role})
   }catch(error:any){
    res.status(500).json ({error:error.message || "Failed To Login"})

   }
} 
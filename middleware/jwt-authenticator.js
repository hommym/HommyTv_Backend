// importing modules
const jwt= require("jsonwebtoken")
require("dotenv").config()
const userAccountCollection= require("../Database/user-account-collection")

//  middle were for authenticating users and providing them with jwt token to show that they are authorized
const jwtAuth=  async (req,res,next)=>{

    const {authorization} =req.headers

    if(!authorization || !authorization.startsWith("Bearer")){
        return  res.status(400).json({status:"Failed",message:"Bad Request"})
    }

   const token= authorization.split(" ")[1]


   try {

    // getting data(ie id) used in creating the token 
    const {id}= jwt.verify(token,process.env.SECRETKEYFORJWT)

    // getting the account withe id in the token
   const accountWithIdIntoken= await userAccountCollection.find({_id:id})


//    checking if any account with the id in the token exist
   if(accountWithIdIntoken.length>0){

    req.userAccount=accountWithIdIntoken[0]

   
   }
    next()

   } catch (error) {

     res.status(401).json({status:"Failed",message:"Unathourized Access"})
   }
   


   

  
}


module.exports= jwtAuth
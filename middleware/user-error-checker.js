// importing modules
const userAccountCollection= require("../Database/user-account-collection")

const errorChecker= async (req,res,next)=>{

const body=req.body

if(body.name && body.email && body.phone && body.password && body.gender && body.age){

    const similarAccountInDatabase= await userAccountCollection.find({email:body.email})

    if(similarAccountInDatabase.length>0){

       return  res.status(200).json({status:"Failed",message:"Account Already Exist"}) 
    }

    next()
}
else{
    res.status(400).json({status:"Failed",message:"Bad request"})
}




}


module.exports=errorChecker
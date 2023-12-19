const errorChecker=(req,res,next)=>{

const body=req.body

if(body.name && body.email && body.phone && body.password){

    next()
}
else{
    res.status(400).json({status:"Failed",message:"Bad request"})
}




}


module.exports=errorChecker

const errorHandler=(req,res,next,err)=>{

if(err instanceof ResourceUnvailable ){

    res.status(404).json({staus:"Succesfull",message:err.message})
}

else if(err instanceof BadRequestError){

    res.status(400).json({status:"failed",message:err.message})
}
else{
    // for any error
    res.status(500).json({status:"Error",message:"Server Error"})
}


}


module.exports=errorHandler



const errorHandler=(err,req,res,next)=>{

if(err instanceof require("../Error-Classes/resource-unavialable-class.js") ){

    res.status(404).json({staus:"Succesfull",message:err.message})
    console.log("RNU");
}

else if(err instanceof require("../Error-Classes/bad-request-error.js")){

    res.status(400).json({status:"failed",message:err.message})
}
else{
    // for any error
    res.status(500).json({status:"Error",message:"Server Error"})
}


}


module.exports=errorHandler

const ResourceUnvialable= require("../Error-Classes/resource-unavialable-class.js")
const BadRequest=require("../Error-Classes/bad-request-error.js")
const userAccountModel=require("../Database/user-account-collection.js")


const synchrozniseUserData= async (req,res)=>{

    console.log(req.params);
    const {userDataSync}= req.params

    const userData= req.body
    console.log(userData);

//    checking if any data is passed for body
   if(!userData.contentTitle){
    throw new BadRequest("No data pass for body")
   }
     if(userDataSync==="wtch-later-sync"){

        await userAccountModel.updateOne({_id:req.userAccount._id},{$push:{watchlater:userData}})
        console.log("Watch later data synchronized");
        res.status(201).send("Data Synchronised With Server")
    }
    else if(userDataSync==="history-sync"){
        await userAccountModel.updateOne({_id:req.userAccount._id},{$push:{watch_history:userData}})
        console.log("History data synchronized");
        res.status(201).send("Data Synchronised With Server")

    }
    else if(userDataSync==="playlist-sync"){
        await userAccountModel.updateOne({_id:req.userAccount._id},{$push:{play_list:userData}})
        console.log("PlayList data synchronized");
        res.status(201).send("Data Synchronised With Server")

    }

    else if(userDataSync==="fav-sync"){
        await userAccountModel.updateOne({_id:req.userAccount._id},{$push:{favorite:userData}})
        console.log(" Favorite data synchronized");
        res.status(201).send("Data Synchronised With Server")
    }

    else{

        throw new ResourceUnvialable("Resource Unavailable")
    }

}


module.exports=synchrozniseUserData
// importing needed modules
const express= require("express")
const asyncHandler=require("express-async-handler")



const localDataSynchronizationRouter=express.Router()


// end points below  is for synchronising users data in  local data storage with server

localDataSynchronizationRouter.post("/fav-sync",)

localDataSynchronizationRouter.post("/wtch-later-sync",)

localDataSynchronizationRouter.post("history-sync",)

localDataSynchronizationRouter.post("playlist_sync",)







module.exports=localDataSynchronizationRouter
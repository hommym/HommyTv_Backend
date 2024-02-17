// importing needed modules
const express= require("express")
const synchronizationController=require("../Controller/user-data-sync-controller.js")

const asyncHandler=require("express-async-handler")



const localDataSynchronizationRouter=express.Router()


// end point below  is for synchronising users data in  local data storage with server

localDataSynchronizationRouter.post("/:userDataSync",asyncHandler(synchronizationController))

// localDataSynchronizationRouter.post("/wtch-later-sync",)

// localDataSynchronizationRouter.post("history-sync",)

// localDataSynchronizationRouter.post("playlist_sync",)







module.exports=localDataSynchronizationRouter
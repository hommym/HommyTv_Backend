// importing needed module
const express= require("express")
const databaseConnector=require("./Database/connectDb")
const accountRouter=require("./Routes/acount-route")
const resourceNotAvialableMiddleware=require("./middleware/resource-unavialable-middleware")
require("dotenv").config()
const jwtAuth=require("./middleware/jwt-authenticator")


// creating the server object
const app=express()

// setting up the json body parser
app.use(express.json())

//  setting up the middleware for verifying jwt 
app.use("/api/v1/account/edit-account-info",jwtAuth)

// setting up routers
app.use("/api/v1/account",accountRouter)


// midlleware for unavialable resources
app.use(resourceNotAvialableMiddleware)







const portNumber=(process.env.PORT)?process.env.PORT:3000

// function for starting the server

async function startApp(){

// connecting to database
await databaseConnector(process.env.DBCONNECTIONSTRING)


// listening to server port
app.listen(portNumber,()=>{

    console.log(`Server is listening to port ${portNumber}....`);
    
    })

}


// starting server
startApp()








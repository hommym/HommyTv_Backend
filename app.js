// importing needed module
const express= require("express")
const databaseConnector=require("./Database/connectDb")
const accountRouter=require("./Routes/acount-route")

require("dotenv").config()


// creating the server object
const app=express()

// setting up the json body parser
app.use(express.json())


// setting up routers
app.use("/api/v1/account",accountRouter)







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








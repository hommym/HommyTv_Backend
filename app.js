// api key  5df9d8434a271efeaf152516c002398d


const express= require("express")

const app= express()

const imgSlideRouter= require("./router-image-slide.js")
const movies=require("./router-movies.js")


app.use("/api/images", imgSlideRouter.router)
app.use("/api/movies", movies.router)




app.listen()



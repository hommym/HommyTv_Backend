// api key  5df9d8434a271efeaf152516c002398d


const express= require("express")

const app= express()

const imgSlideRouter= require("./router-image-slide.js")
const movies=require("./router-movies.js")
const series=require("./router-tv_series.js")


app.use("/api/images", imgSlideRouter.router)
app.use("/api/movies", movies.router)
app.use("/api/tv_series",series.router)




app.listen(5000,()=>{
console.log("Server is listening to port 5000");

})



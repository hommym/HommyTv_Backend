const express= require("express")

const router= express.Router()


router.get("/imagesforslide" ,async (req,res)=>{
// numberOfImages is for tracking the number of images we currently have
let numberOfImages=0

// listOfImages is for saving the images we want to send
const listOfImage=[]

try{



// trendingMovies holds the json response of the request for trending movies
let trendingMovies= (await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=5df9d8434a271efeaf152516c002398d"))

// coverting the response to json
trendingMovies= await trendingMovies.json()

// trendingTvSeries holds the json response of the request for trending series
let  trendingTvSeries= (await fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=5df9d8434a271efeaf152516c002398d"))


// coverting the response to json
trendingTvSeries= await trendingTvSeries.json()


// Both for loop is for adding images to  listOfImages variables
for(const movie of trendingMovies.results){

    if(numberOfImages===10){
        break
    }
    listOfImage.push(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)
    numberOfImages++
}


for(const movie of trendingTvSeries.results){

    if(numberOfImages===20){
        break
    }
    listOfImage.push(`https://image.tmdb.org/t/p/original/${movie.poster_path}`)
    numberOfImages++
}


}
catch(err){
    res.status(500)
    return res.json({error:"Internal Error In Server Try again"})
    
    }


res.status(200)
res.json({imageList:listOfImage})


})



module.exports={router}
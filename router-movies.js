const express= require("express")

const router= express.Router()


router.get("/recent", async (req,res)=>{

let numberOfMovies=0
let listOfMoviesToSend =[]

    // retreiving all recent movies
    let recentMovie= await fetch("https://api.themoviedb.org/3/movie/popular?api_key=5df9d8434a271efeaf152516c002398d")

    // converting the respose into json
    recentMovie= await recentMovie.json()

    // geting the movie detailes that is all information about the movie
    for(const movie of recentMovie.results){

        let movieToAddTolist=await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=5df9d8434a271efeaf152516c002398d`)

        movieToAddTolist= await movieToAddTolist.json()

        movieToAddTolist.poster_path=`https://image.tmdb.org/t/p/original${movieToAddTolist.poster_path}`

        movieToAddTolist.backdrop_path=`https://image.tmdb.org/t/p/original${movieToAddTolist.backdrop_path}`


        listOfMoviesToSend.push(movieToAddTolist)
        numberOfMovies++
        // if(numberOfMovies===1){
        //     break
        // }

    }



    res.json({recentMovies:listOfMoviesToSend})



})







module.exports={router}
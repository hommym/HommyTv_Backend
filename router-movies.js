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



    res.json({listOfMovies:listOfMoviesToSend})



})

router.get("/upcoming", async (req,res)=>{

    
let numberOfMovies=0
let listOfMoviesToSend =[]

    // retreiving all upcoming movies
    let upcomingMovie= await fetch("https://api.themoviedb.org/3/discover/movie?api_key=5df9d8434a271efeaf152516c002398d&primary_release_year=2024|2025")

    // converting the respose into json
    upcomingMovie= await upcomingMovie.json()

    // geting the movie detailes that is all information about the movie
    for(const movie of upcomingMovie.results){

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



    res.json({listOfMovies:listOfMoviesToSend})





})


router.get("/top_rated" ,async (req,res)=>{



    let numberOfMovies=0
    let listOfMoviesToSend =[]
    
        // retreiving all top rated movies
        let topRatedMovie= await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=5df9d8434a271efeaf152516c002398d")
    
        // converting the respose into json
        topRatedMovie= await topRatedMovie.json()
    
        // geting the movie detailes that is all information about the movie
        for(const movie of topRatedMovie.results){
    
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
    
    
    
        res.json({listOfMovies:listOfMoviesToSend})
    
    
    


})

router.get("/now_playing",async(req,res)=>{

    let numberOfMovies=0
    let listOfMoviesToSend =[]
    
        // retreiving all  movies which is now playing in theatres
        let nowPlayingdMovies= await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=5df9d8434a271efeaf152516c002398d")
    
        // converting the respose into json
        nowPlayingdMovies= await nowPlayingdMovies.json()
    
        // geting the movie detailes that is all information about the movie
        for(const movie of nowPlayingdMovies.results){
    
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
    
    
    
        res.json({listOfMovies:listOfMoviesToSend})
    
    
})

module.exports={router}
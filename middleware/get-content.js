
const axios= require("axios")
const {JSDOM}=require("jsdom")
const puppeteer=require("puppeteer")



const getSeries= async (req,res,next)=>{

   
    const {mediaType}=req.params
    const {title}=req.query
 

    // codes for geting the series

    if(mediaType==="series"){

        // we are getting the links to all the season of the series

       try{
          // opening browser
          const browser= await puppeteer.launch({ headless: false  , args: ['--disable-features=site-per-process']})
          //  const context = await browser.createIncognitoBrowserContext();
           const page= await browser.newPage()
          
         
   
  
           await page.goto("https://upmovies.to",{ timeout: 10000000 })
  
           await page.focus(`form >>>> input[id="story"]`)
           await page.type(`form >>>> input[id="story"]`, title, { delay: 1000 })
          
  
     // Press the Enter key
     await page.keyboard.press('Enter')
  
  
     // Wait for next page to load 
     await page.waitForNavigation({ timeout:  10000000  })
  
   
     const linkToSearchResults=page.url()
  
     await browser.close()
     const allSeriesHtml= await axios.get(linkToSearchResults)
     const linkToAllEpisodeOfASeason=[]
     let linkToSeason=null
     let dom = new JSDOM(allSeriesHtml.data)
  
   dom.window.document.querySelectorAll(".title").forEach((element)=>{
  
  // getting link to season
         if( element.querySelector("a").textContent===title ){
          linkToSeason=element.querySelector("a").href
         }   
  
     })
  
  
  //    getting link to episode
  
  const allEposidesHtml= await axios.get(linkToSeason)
  dom=new JSDOM(allEposidesHtml.data)
  
  dom.window.document.querySelector("#details").querySelectorAll("a").forEach((linkElemment)=>{
  
      linkToAllEpisodeOfASeason.push(linkElemment.href)
      
  })
  
  
  
//    console.log(linkToAllEpisodeOfASeason); 
   res.allEpisodes=linkToAllEpisodeOfASeason
   next()
       }


        // try {
            
        //     const allSeriesHtml= await axios.get("https://o2tvseries2.com/search/list_all_tv_series")
        //     let requestedSeriesLink=null
        //     const selectedSeriesSeasonLinks=[]

        //     const dom = new JSDOM(allSeriesHtml.data);
        //     dom.window.document.querySelectorAll(".data").forEach(divElement => {

        //         // geting the link to the series being requested
        //      const linkElement=divElement.querySelector("a")

        //        if(linkElement.textContent===title){

        //             requestedSeriesLink=linkElement.href
                  
        //        }
                
        //     });


        //     if(!requestedSeriesLink){

        //         return res.status(500).json({status:"Failed",message:"Series with such title does not exist in database"})
        //     }

            

        //     // making another request for the links for individual seasons of the series
        //     const selectedSeriesHtml= await axios.get(requestedSeriesLink)
            
        //     const dom1= new JSDOM(selectedSeriesHtml.data)
        //     dom1.window.document.querySelectorAll(".data").forEach(divElement =>{

        //         const linkElement=divElement.querySelector("a")
        //          selectedSeriesSeasonLinks.push(linkElement.href)
                
        //     })

            
            
        //     res.seasons=selectedSeriesSeasonLinks.sort()
        //     next()
         catch (error) {
            
            res.status(500).json({status:"Fail",message:`${error}`})
        }
       


        
        
    }
    else if (mediaType==="movies"){

// for now code has being added

       next()
    }

    else{
        console.log(mediaType);
        res.status(400).json({status:"Failed",message:"Bad Request"})

    }

}


module.exports=getSeries
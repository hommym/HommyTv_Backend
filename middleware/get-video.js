const axios= require("axios")
const {JSDOM}=require("jsdom")
const { default: puppeteer } = require("puppeteer")
const pupppeteer=require("puppeteer")
const fileSys= require("fs/promises")
const path=require("path")
const { createWorker }= require("tesseract.js")


 async function getTextFromImage(){

    const worker = await createWorker('eng');
    const ret = await worker.recognize(path.join(__dirname,"/temp-files/one.png"));
    await worker.terminate();
    return ret.data.text
}


const getVideo= async (req,res,next)=>{

const {mediaType}= req.params
const{link}=req.query

try {
    if(mediaType==="series" && link){
         // opening browser
         const browser= await puppeteer.launch({ headless: false  , args: ['--disable-features=site-per-process']})
         //  const context = await browser.createIncognitoBrowserContext();
          const page= await browser.newPage()

         await page.goto(link)

        await browser.close()
        next()
        }
        else if(mediaType==="movie" && link){
        
        // not yet implemented
        
        }
        else{
        
        res.status(400).json({status:"Failed",message:"Bad Request"})
        
        }
} catch (error) {
    console.log(error)
    res.status(500).json({status:"Failed",message:"Sever Error"})
}



}



module.exports=getVideo
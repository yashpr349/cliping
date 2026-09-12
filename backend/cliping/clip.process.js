const { validationResult } = require("express-validator")
const { YtDlp } = require("ytdlp-nodejs")
const ytdlp = new YtDlp()
const fs = require('fs')

async function getvalidid(link){
    console.log("validating url .......")
    const info = await ytdlp.getInfoAsync(
        link,
    );
    if(info._type == 'playlist'){
        return false
    }
    console.log(info.title);
    return true
}

async function download(link){
    console.log("downloading")
    const result = await ytdlp.download(link).filter('audioonly').audioQuality(0).type('wav').on(
        'progress', (p)=> console.log(`${p.percentage_str}`)
    ).run()
    return result
}

async function audio_to_text() {

    let folder_path = './'
    
    fs.readdir(folder_path, (err, files)=>{
        if(err){
            console.log(err)
        }
        files.forEach(file =>{
            console.log(file)
        })
    })
}

module.exports.clip = async (req, res)=>{
    let { link } = req.body
    
    let result = await getvalidid(link)

    let audio = await download(link)

    let audio_file_path = audio.filePaths;

    console.log(audio_file_path)
    
    return res.send(audio_file_path)
}
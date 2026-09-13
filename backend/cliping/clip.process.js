const { validationResult } = require("express-validator")
const { YtDlp } = require("ytdlp-nodejs")
const ytdlp = new YtDlp()
const fs = require('fs').promises;
const { exec } = require('child_process')
const utils = require("util")


const execPromise = utils.promisify(exec)


//validating the url
async function valid_url(link){
    try {
        console.log("validating the url")
        let info = await ytdlp.getInfoAsync(
            link
        )
        if(info._type === "playlist"){
            console.log(info)
            return {
                "status" : false,
                "message" : "playlist not allowed"
            }
        }else{
            return {
                "status" : true,
                "message" : info.title
            }
        }
    } catch (error) {
        return {
            "status" : false,
            "message" : "internal server error"
        }
    }
}

async function download(link){
    console.log("downloading")
    const result = await ytdlp.download(link).filter('audioonly').audioQuality(0).type('wav').on(
        'progress', (p)=> console.log(`${p.percentage_str}`)
    ).run()
    return result
}

async function cmd_execution(cmd) {
    try{
        const { stdout, stderr } = await execPromise(cmd)

        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
        }

        console.log(`Command output:\n${stdout}`);
        return stdout
    }catch(error){
        console.error(`Error executing command: ${error.message}`);
        throw error;
    }
}


module.exports.clip = async (req, res)=>{
    let { link } = req.body
    
    let result = await valid_url(link)

    if(result.status){
        //download audio
        let audio = await download(link)
        let audio_file_path = audio.filePaths;

        console.log(audio_file_path)
        console.log(result.message)
        //download audio to text

        cmd_execution(`cd cliping && python audio_to_text.py "${audio_file_path}"`)
            .then(version => console.log(`${version.trim()}`))
            .catch(err => console.error('Failed to transcript'));
        
    }else{
        return res.send(result.message)
    }
}
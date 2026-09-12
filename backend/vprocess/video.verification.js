const { json } = require("express");
const { validationResult } = require("express-validator");

module.exports.video_verification = async (req, res) => {
    const hasError = isValidResult(req, res);

    if (hasError) return; // stop here, response already sent
    
    const { link } = req.body;

    if(link.hostname == "www.youtube.com" || link.hostname == "youtube.com"){
        return res.status(200).json({
            "message" : "link is valid"
        })
    }
};

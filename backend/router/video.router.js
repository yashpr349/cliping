const express = require('express')
const router =  express.Router()
const { body } = require('express-validator')
const { clip } = require("../cliping/clip.process")

router.post('/',[
    body('link').notEmpty()
], clip)

module.exports = router
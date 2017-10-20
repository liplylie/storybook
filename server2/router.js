const express = require('express')
const router = express.Router() 
const controller = require ('./controller.js')

router.get('/chat', controller.getChat)
router.get('/messages', controller.getMessages)
router.post('/chat', controller.sendMessage)


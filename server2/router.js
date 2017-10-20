const express = require('express')
const router = express.Router() 
const roomController = require('./roomController')
const friendController = require('./friendController')

router.get('/chats', messageController.getAllRooms);

//only use from friends view
router.post('/chat/:user2Id', roomController.createRoom);

router.get('/friends', friendController.getFriendList);
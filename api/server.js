const express = require('express');
const USERS = require('./users/model')

const server = express();

// [GET] - gets all users from the model
server.get('/api/users/', async (request, response) => {
     try {
          const users = await USERS.find();
          response.status(200).json(users)
     }
     catch (error) {
          response.status(500).json({
               message: "The users information could not be retrieved",
               error: error.message,
          })
     }
})


// Catch all when nothing specific is specified
server.use('*', (request, response) => {
     response.status(404).json({
          message: 'not found'
     })
})


module.exports = server; 

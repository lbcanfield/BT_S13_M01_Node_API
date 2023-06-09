const express = require('express');
const USERS = require('./users/model')

const server = express();

const apiURL = '/api/users/'

// [GET] - gets all users from the model
server.get(`${apiURL}`, async (request, response) => {
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

// [GET] obtain a user based on their id
server.get(`${apiURL}:id`, async (request, response) => {
     try {
          // throw new Error('oops');
          const { id } = request.params;
          const user = USERS.findById(id);
          user ?
               response.status(200).json(user) :
               resposne.status(500).json({
                    message: "The user information could not be retrieved"
               })
     }
     catch (error) {
          response.status(404).json({
               message: 'The user with the specified ID does not exist'
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

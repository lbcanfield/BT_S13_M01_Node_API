const express = require('express');
const USERS = require('./users/model')

const server = express();
server.use(express.json());

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

// [POST] - Creates a new user
server.post(`${apiURL}`, async (request, response) => {
     try {
          const data = request.body;
          if (!data.name || !data.bio) {
               response.status(400).json({
                    message: "Please provide name and bio for the user"
               })
          }
          else {
               // throw new Error('oops');
               const newUser = await USERS.insert(data);
               response.status(201).json(newUser)
          }
     }
     catch (error) {
          response.status(500).json({
               message: "There was an error while saving the user to the database"
          })
     }
})

// [PUT] - updates a specific user
server.put(`${apiURL}:id`, async (request, response) => {
     const { id } = request.params;
     const { name, bio } = request.body;
     try {
          const fetchUser = await USERS.findById(id)
          if (!fetchUser) {
               response.status(404).json({
                    message: "The user with the specified ID does not exist"
               })
          }
          else {
               if (!name || !bio) {
                    response.status(400).json({
                         message: "Please provide name and bio for the user"
                    })
               }
               else {
                    const updatedUser = await USERS.update(id, { name, bio })
                    response.status(200).json(updatedUser);
               }
          }
     }
     catch (error) {
          response.status(500).json({
               message: "There was an error while saving the user to the database"
          })
     }
})

// [DELETE] - Deletes a specific user based on id
server.delete(`${apiURL}:id`, async (request, response) => {
     try {
          const selectedUser = await USERS.findById(request.params.id)
          if (!selectedUser) {
               response.status(404).json({
                    message: "The user with the specified ID does not exist"
               })
          }
          else {
               const deletedUser = await USERS.remove(selectedUser.id)
               response.status(200).json(deletedUser)
          }

     }
     catch (error) {
          response.status(500).json({
               message: "There was an error while saving the user to the database"
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

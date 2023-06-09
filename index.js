const server = require('./api/server');

//Declaring the port number that the server will use.
const port = 1701;


//Function to allow the server to listen on the above declared port number
server.listen(port, () => {
     console.log(`listening on port ${port}`);
});
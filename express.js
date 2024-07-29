const express = require('express')
const users = require("./MOCK_DATA.json")
const app = express()
const port= 3000;

const cors = require('cors');
app.use(cors());


app.get('/api/users', (req, res) => {

    return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id )
    return res.json(user);
})

app.post('/api/saveuser', (req, res) => {

    console.log("inside save")
    const usersList = req.body;
    console.log(usersList)
  
    // Save the data of user that was sent by the client
  
    // Send a response to client that will show that the request was successfull.
    res.send({
      message: 'New user was added to the list',
    });


  }
);

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`)
})

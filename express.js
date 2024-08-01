const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = 3000;
const express = require("express");
const base64Img = require("base64-img")
const app = express();
var collection;
var collectionLink;

const cors = require("cors");
app.use(cors());

app.use(express.json());

async function getConnection(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    console.log("Connecting to MongoDB Atlas cluster..");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

async function createDB() {
  const uri = "mongodb://localhost:27017/";
  let mongoClient;

  try {
    mongoClient = await getConnection(uri);
    const db = mongoClient.db("profile_db");
    db.createCollection("user");
    db.createCollection("link");

    collection = db.collection("user");
    // collection.insertOne({
    //   username: "Pranav Tikhe",
    //   about:
    //     "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit",
    //   image: "",
    // });
    
    // collectionLink = db.collection("link");
    // collectionLink.insertOne({
    //   linkAddress: "link1",
    //   userId:"",
    // });
  } catch (e) {
    console.log("error connecting to MongoDB" + e);
  }
}

createDB().then(() => {
  console.log("completed");
});

// app.get("/api/users", (req, res) => {
//   return res.json(users);
// });
app.get("/api/users/:id", async (req, res, next) => {
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id === id);
  // return res.json(user);
  console.log(req.params.id);
  console.log("hey!");
  // let user = await collection.findOne({ _id: new ObjectId(req.params.id) });
  // let links = await collectionLink.findMany({userId: new ObjectId(user._id +'')});

//   user['links'] = links;
  
//     return res.json(user);
 });

app.post("/api/saveuser", async (req, res, next) => {
  console.log("inside save");
  const user = req.body;
  console.log(user);
  const filter = { _id: new ObjectId(req.body.id + '') };

  replacementDocument = {username:user.username , about: user.about, image: user.image};
  const result = await collection.replaceOne(filter , replacementDocument);


  // const updateDocument = {
  //   $set: {
  //     username: user.username,
  //     about: user.about,
  //   },
  // };
  //const result = await collection.updateOne(filter, updateDocument);
  console.log(result)

  // Save the data of user that was sent by the client
  // Send a response to client that will show that the request was successfull.
  res.send({
    message: "user was updated",
  });
});

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

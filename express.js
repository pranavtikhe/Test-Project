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
    collectionLink = db.collection("link");
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

app.get("/api/users/:id", async (req, res, next) => {

  console.log("Get req id: ",req.params.id);
  let user = await collection.findOne({ _id: new ObjectId(req.params.id) });
  let links = await collectionLink.find({userid: req.params.id});
  user.links = [];

  // var obj = JSON.parse(user);
  // obj['links'].push({"teamId":"4","status":"pending"});
  // jsonStr = JSON.stringify(obj);

  for await (const link of links) {
    console.log(link);
    user.links.push(link);
  }
  //console.log("get db link: ",links);
  return res.json(user);
 });

app.post("/api/saveuser", async (req, res, next) => {
  console.log("inside save");
  const user = req.body;
  console.log(user);
  const filter = { _id: new ObjectId(req.body.id + '') };

  replacementDocument = {username:user.username , about: user.about, image: user.image };
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

app.delete("/api/links/delete/:id", async (req, res, next) => {

  console.log("Get req id: ",req.params.id);
  const result = await collectionLink.deleteOne({ _id: new ObjectId(req.params.id) });
  console.log(result)
  res.send({
    message: "User deleted",
  });
 });

app.post("/api/savelink", async (req, res, next) => {
  const link = req.body;

  const filter = { _id: new ObjectId(req.body.id + '') };
  replacementDocument = {userid:link.userid, title:link.title, url:link.url, description:link.description};
  
  const result = await collectionLink.replaceOne(filter , replacementDocument);

  res.send({
    message: "link updated",
  });
});


 app.post("/api/addlink", async (req, res, next) => {
  const link = req.body;
  
  const result = await collectionLink.insertOne(link);

  res.send({
    message: "link added",
  });
});

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});

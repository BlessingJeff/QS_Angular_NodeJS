const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb+srv://blessingaslan:blessing@cluster0.vbqughv.mongodb.net/?retryWrites=true&w=majority";
// const URL = "mongodb://localhost:27017";

PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: "*"
}))

// Get all Users
app.get("/users", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("myLatest");
        let users = await db.collection("users").find({}).toArray();
        await connection.close();
        res.json(users);
    } catch (error) {
        console.log(error)
    }
});

//Create user
app.post("/create-user", async function (req, res) {
  try {
      let connection = await mongoClient.connect(URL);
      let db = connection.db("myLatest")
      await db.collection("users").insertOne(req.body)
      await connection.close();
      res.json({
          message: "User Added"
      })
  } catch (error) {
      console.log(error)
  }
});

// Get user by token
app.get("/user/:id", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL);
        let db = connection.db("myLatest");
        let objId = mongodb.ObjectId(req.params.id)
        let users = await db.collection("users").findOne({_id: objId }, {$set: req.body })
        await connection.close();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Running on port ${PORT}`);
});

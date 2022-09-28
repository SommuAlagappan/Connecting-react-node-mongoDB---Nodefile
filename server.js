const express = require("express");
const app = express();
const cors = require("cors")
const mongodb = require("mongodb")
const dotenv = require("dotenv").config()
const mongoClient = mongodb.MongoClient
const URL = process.env.DB;
const DB = "movie_names"
// console.log(process)


//Midleware
app.use(express.json());
app.use(cors({
  origin : "http://localhost:3000"
}))


//Create all users
app.post("/user", async function (req, res) {
  try{
  //Step1: Create a connection between Nodejs and MongoDB.
  const connection = await mongoClient.connect(URL)
  
  //Step2: Select the DB
  const db = connection.db(DB)
  
  //Step3: Select the collection
  //Step4: Do the operation (Create,Read,Update and Delete)    //merging both the steps 3&4
  
  await db.collection("products").insertOne(req.body)    //if many data - insertMany
  
  //Step5: Close the connection 
  
  await connection.close()
  
  res.status(200).json({message: "Data inserted successfully"})
  
  } catch (error) {
    console.log(error)
  //If any error throw error
  res.status(500).json({message: "Something went wrong"})
  }})

//Get all users
app.get("/users",async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);

    const db = connection.db(DB)
  
    let resUser = await db.collection("products").find().toArray() ;  //data va resUser gura variable ah store pannikiren 
  
    await connection.close()

    res.json(resUser);         //final ah data veliya anupanum  

  } catch (error) {
    console.log(error)
//If any error throw error
res.status(500).json({message: "Something went wrong"})
}})
 
//Get user by id
app.get("/user/:id",async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);

    const db = connection.db(DB)
  
    await db.collection("products").findOne({_id: mongodb.ObjectId(req.params.id)});  
  
    await connection.close()

} catch (error) {
console.log(error)
res.status(500).json({message: "Something went wrong"})
}})
 
//Update user by ID
app.put("/user/:id",async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);

    const db = connection.db(DB)
  
    await db.collection("products").findOneAndUpdate({_id: mongodb.ObjectId(req.params.id)},{$set:req.body});  //variable store pannamalum pannalam 
  
    await connection.close()

    res.json("Data updated successfully");

  } catch (error) {
    console.log(error)

res.status(500).json({message: "Something went wrong"})
}})

//Delete user by ID
app.delete("/user/:id",async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);

    const db = connection.db(DB)
  
    await db.collection("products").findOneAndDelete({_id: mongodb.ObjectId(req.params.id)});  //data va resUser gura variable ah store pannikiren 
  
    await connection.close()

    res.json("User deleted");         //final ah data veliya anupanum  

  } catch (error) {
    console.log(error)
//If any error throw error
res.status(500).json({message: "Something went wrong"})
}})


//
app.post("register", async function (req, res) {
  
})




app.listen(process.env.PORT || 3003);


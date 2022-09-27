const express = require("express");
const app = express();
const cors = require("cors")
const mongodb = require("mongodb")
const env = require("dotenv").config()
const mongoClient = mongodb.MongoClient
const URL = process.env.DB;
const DB = "movie_names"
console.log(process)



//Midleware
app.use(express.json());
app.use(cors({
  origin : "http://localhost:3000"
}))


//Create all users here
app.post("/user", async function (req, res) {
  try{
  //Step1: Create a connection between Nodejs and MongoDB.
  const connection = await mongoClient.connect(URL)
  
  //Step2: Select the DB
  const db = connection.db(DB)
  
  //Step3: Select the collection
  //Step4: Do the operation (Create,Read,Update and Delete)    //merging both the steps 3&4
  
  await db.collection("users").insertOne(req.body)    //if many data - insertMany
  
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
  
    let resUser = await db.collection("users").find().toArray() ;  //data va resUser gura variable ah store pannikiren 
  
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
  
    let resUser = await db.collection("users").findOne({_id: mongodb.ObjectId(req.params.id)});  //data va resUser gura variable ah store pannikiren 
  
    await connection.close()

    res.json(resUser);         //final ah data veliya anupanum  

  } catch (error) {
    console.log(error)
//If any error throw error
res.status(500).json({message: "Something went wrong"})
}})
 

//Update user by ID
app.put("/user/:id",async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);

    const db = connection.db(DB)
  
    let resUser = await db.collection("users").findOneAndUpdate({_id: mongodb.ObjectId(req.params.id)},{$set:req.body});  //data va resUser gura variable ah store pannikiren 
  
    await connection.close()

    res.json(resUser);         //final ah data veliya anupanum  

  } catch (error) {
    console.log(error)
//If any error throw error
res.status(500).json({message: "Something went wrong"})
}})


//Delete user by ID
app.delete("/user/:id",async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);

    const db = connection.db(DB)
  
    let resUser = await db.collection("users").findOneAndDelete({_id: mongodb.ObjectId(req.params.id)});  //data va resUser gura variable ah store pannikiren 
  
    await connection.close()

    res.json(resUser);         //final ah data veliya anupanum  

  } catch (error) {
    console.log(error)
//If any error throw error
res.status(500).json({message: "Something went wrong"})
}})


app.listen(process.env.PORT || 3003);


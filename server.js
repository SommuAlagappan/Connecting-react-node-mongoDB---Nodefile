const express = require("express");
const app = express();
const cors = require("cors")


let users = [
  // {
  //   id : 1,
  //   name:"alagappan",
  //   age:20
  // },
  // {
  //   id: 2,
  //   name:"sommu",
  //   age:20
  // }
];
//Midleware
app.use(express.json());
app.use(cors({
  origin : "http://localhost:3000"
}))

// Query Params
app.get("/users", function (req, res) {
  let qparams = req.query;
  console.log(qparams);
  
  let resUser = [];
  for (
   let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++){
   if(users[index]){
     resUser.push(users[index]);
   }
  }
  res.json(resUser);
  });
  



app.get("/home", function (req, res) {
  res.json([
    {
      name: "Sommu",
      age: 26,
    },
    {
      name: "Alagappan",
      age: 27,
    },
  ]);
});

//onnu vanthu - user ah insert pandrathukaana API / Oru user ah create pandrathukaana route
app.post("/user", function (req, res) {
  console.log(req.body);
  req.body.id = users.length + 1;
  users.push(req.body);
  res.json({ message: "Hello World" });
});

//rendavuthu - Ulla iruka ella users yum list panni paakurathukaana API / Ella users ah list pandrathukaana route
app.get("/users", function (req, res) {
  res.json(users);
});

app.get("/user/:id", function (req, res) {
  //console.log(req.params.id)
  let userID = req.params.id;
  let user = users.find((item) => item.id == userID);
  //userID la namma url parameter 1 nu kuduthurukim so inga item.id == userID kudukurom
  if (user) {
    res.json(user);
  } else {
    res.json("User not found");
  }
});

app.put("/user/:id", function (req, res) {
  let userID = req.params.id;
  let userIndex = users.findIndex((item) => item.id == userID);

  if (userIndex != -1) {
    Object.keys(req.body).forEach((item) => {
      users[userIndex][item] = req.body[item];
    });
    res.json({
      message: "Update Done",
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

app.delete("/user/:id", function (req, res) {
  let userID = req.params.id;
  let userIndex = users.findIndex((item) => item.id == userID);

  if (userIndex != -1) {
    users.splice(userIndex, 1); //splice(At what position/index ,how many to delete, add new)

    res.json({ message: "User deleted" });
  } else {
    res.json({ message: "User not found" });
  }
});

app.listen(process.env.PORT || 3003);




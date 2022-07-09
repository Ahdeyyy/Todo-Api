const app = require("./app.js").app;
const isLogged = require('./app.js').isLogged;
const {createTask , getTasks} =  require("./task");
let loggedOn = isLogged();

app.get("/", function (req, res) {
  loggedOn = isLogged();
  console.log(isLogged());
  if (loggedOn) {
    res.send("Logged in");
  } else {
    res.render("pages/auth");
  }
  // res.render("pages/auth");
});

app.get("/policy", (req, res) => {
  res.sendFile(__dirname + "/views/privacy.html");
});

app.get("/tos", (req, res) => {
  res.sendFile(__dirname + "/views/tos.html");
});

//status =>  created , ok , deleted , updated , failed

//returns an array of tasks [ { }, { } , ...]
app.get("/user/:_id/tasks", (req, res) => {
  let userId = req.params._id;
  getTasks(userId,res);
});
//query - taskname
//responds with  { taskname , status}
app.post("/user/:_id/tasks", (req, res) => {});

//query - task id
//responds with { taskname , status}
app.put("/user/:_id/tasks", (req, res) => {});

//query - task id
//responds with { taskname , status}
app.delete("/user/:_id/tasks", (req, res) => {});

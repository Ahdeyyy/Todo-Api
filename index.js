const app = require("./app.js").app;
const isLogged = require("./app.js").isLogged;
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  viewUser,
} = require("./task");
let loggedOn = isLogged();

app.get("/", function (req, res) {
  loggedOn = isLogged();
  if (loggedOn) {
    res.redirect("/api-docs");
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

//returns the user

app.get("/user/:id", (req, res) => {
  viewUser(req.params.id, res);
});

//returns an array of tasks [ { }, { } , ...]
app.get("/user/:id/tasks", (req, res) => {
  getTasks(req.params.id, res);
});
//query - taskname
//responds with  { taskname , status}
app.post("/user/:id/tasks", (req, res) => {
  let userId = req.params.id;
  let taskname = req.query.taskname;
  createTask(userId, taskname, res);
});

//query - task id
//responds with { taskname , status}
app.patch("/user/:id/tasks", (req, res) => {
  let toggle;
  let newName;
  if (req.query.toggle === "true") {
    toggle = true;
  } else {
    toggle = false;
  }
  if (req.query.newName) {
    newName = req.query.newName;
  } else {
    newName = false;
  }
  updateTask(req.params.id, req.query.taskId, toggle, newName, res);
});

//query - task id
//responds with { taskname , status}
app.delete("/user/:id/tasks", (req, res) => {
  deleteTask(req.params.id, req.query.taskId, res);
});

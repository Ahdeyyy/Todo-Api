const app = require('./app.js').app;

app.get('/',(req,res) => {
    res.send("To-do home dir");
});

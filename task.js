const User = require('./schemas.js').TdUser;
const Task = require('./schemas.js').task;


function createUser(id,username){
   User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        console.log(result);
        if(!result){
            new User({
                id: id,
                username: username,
                tasks: []
            }).save((err,data) =>{
                if(err) console.error(err);
              });
        }
    });

};

function createTask(id , taskname, res){
    let new_task = new Task({
        name: taskname,
        completed: false
    });
    User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        result.tasks.push(new_task);
        result.save((err,data) =>{
            if(err) console.error(err);
            res.json(data.tasks);
          });
            })
} 

function getTasks(id,res){
    User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        res.json(result.tasks);
            });
} 

function updateTask(taskId,res){
    Task.findOne({_id: taskId}, (err,result) => {
        if(err) console.error(err);
        result.completed = !result.completed;
        result.save((err, result) => {
            if(err) console.error(err);
            res.json(result);
        });
    })
}

exports.createUser = createUser;
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
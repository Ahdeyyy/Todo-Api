const User = require('./schemas.js').TdUser;
const Task = require('./schemas.js').task;


function createUser(id,username,res){
   User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        if(!result){
            new User({
                id: id,
                username: username,
                tasks: []
            }).save((err,data) =>{
                if(err) console.error(err);
                res.send(data);
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
        result.save((err) =>{
            if(err) console.error(err);
            res.send(new_task);
          });
            })
} 

function getTasks(id,res){
    User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        res.json(result.tasks);
            });
} 

function deleteTask(userid,taskId,res){
    let oTask;
    User.findOne({id: userid} , (err, result) => {
        if(err) console.error(err);

        for(let i = 0 ; i < result.tasks.length ; i++){
            if(result.tasks[i]._id == taskId ){
                oTask = result.tasks[i];
            }
        }
        result.tasks = result.tasks.filter( (task) => { return task._id != taskId });
        result.save((err) =>{
            if(err) console.error(err);
            res.json(oTask);
        });
            });
}

function updateTask(userid,taskId,toggle,newName,res){

    User.findOne({id: userid} , (err, result) => {
        if(err) console.error(err);

        for(let i = 0 ; i < result.tasks.length ; i++){
            if(result.tasks[i]._id == taskId ){
                if(toggle){
                    result.tasks[i].completed = !result.tasks[i].completed;
                }
                if(newName){
                    result.tasks[i].name = newName;
                }
                result.tasks[i].save((err,result) =>{
                    if(err) console.error(err);
                    res.send(result);
                })
                break;
            }
        }
        result.save((err) =>{
            if(err) console.error(err);
        });
            });
}

exports.createUser = createUser;
exports.createTask = createTask;
exports.getTasks = getTasks;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask
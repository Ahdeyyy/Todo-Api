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

function createTask(id , taskname){
    let new_task = new Task({
        name: taskname,
        completed: false
    });
    User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        result.tasks.push(new_task);

            }).save((err,data) =>{
                if(err) console.error(err);
              });
} 

function getTasks(id,res){
    User.findOne({id: id} , (err, result) => {
        if(err) console.error(err);
        res.json(result.tasks);
            });
} 

exports.createUser = createUser;
exports.createTask = createTask;
exports.getTasks = getTasks;
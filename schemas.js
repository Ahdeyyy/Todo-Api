const mongoose = require('mongoose');

const myUri = process.env['URI'];
mongoose.connect(myUri, { useNewUrlParser: true, useUnifiedTopology: true });


let TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    }
});

let UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    tasks: [TaskSchema]
});

let TdUser = mongoose.model('TdUser',UserSchema);

exports.TdUser = TdUser;

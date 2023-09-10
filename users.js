const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    // password:String, - /signup - post -- accept name email pwd -- /login - post -- name pwd
    // thing to research express js how to handle post body -- postman post req how -- 
    //required field , explicit check not add user -- user already exist feature
});
module.exports = mongoose.model('users', userSchema);
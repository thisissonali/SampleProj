const express = require('express');
const User = require('./users');
const mongoose = require('mongoose');
app = express();
app.use(express.json())
const DB = 'mongodb+srv://ranasonali987:osEgSlmRP0G5UbCE@cluster0.xgvlmk9.mongodb.net/sample?retryWrites=true&w=majority'

mongoose.connect(DB).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(`no connection`));

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.send(err);
    }
});
//signup feature implemented
app.post('/signup', async (req, res) => { 
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }
    try {
        const newUser = await User.create({
            name,
            email,
            password
        });
        res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
                
        });
    } catch (error) {
         throw new Error("Failed to  create user");
        
    }
        
    
})
app.listen(3000, console.log("listening"));
    

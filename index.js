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
//login feature
app.post('/login', async (req, res) => { 
    const { email, password } = req.body; 
    const user = await User.findOne({ email });
    try {
        if (user && user.password === password) {
         res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        
        });
        } else {
            res.json("Enter valid credentials");
        }
    } catch (error) {
        res.status(401);
        res.send(error);
    }

})
app.listen(3000, console.log("listening"));
    

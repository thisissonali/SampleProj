const express = require('express');
const User = require('./users');
const mongoose = require('mongoose');
const { getHash, matchHash } = require('./utils/bcrypt');


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
    if (!name || !email || !password) res.send("Please enter all fields");
    else {
        const user = await User.findOne({ email });
        if (user) {
            res.send("User already exists");
        } else {
            try {
                
                const hashedPassword = await getHash(password);

                const newUser = await User.create({
                    name,
                    email,
                    password : hashedPassword,
                });
                res.send(newUser);
            } catch (err) {
                res.send("Failed to create user");
        
            }
        
        }
    }
})
//login feature
app.post('/login', async (req, res) => { 
    const { email, password } = req.body; 
    const user = await User.findOne({ email });
    try {
        const isValid = await matchHash(user.password, password); 
        if (user && isValid) {
         res.send(user);
        } else {
            res.json("Enter valid credentials");
        }
    } catch (error) {
        res.status(401);
        res.send(error);
    }

})
app.listen(3000, console.log("listening"));
    

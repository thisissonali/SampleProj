require('dotenv').config();

const express = require('express');
const User = require('./users');
const mongoose = require('mongoose');
const { getHash, matchHash } = require('./utils/bcrypt');
const  randomStringAsBase64Url  = require('./utils/uid')
// const jwt = require('jsonwebtoken');

app = express();
app.use(express.json())
const DB = process.env.MONGO_URI

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
                const token = randomStringAsBase64Url();
                const newUser = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    token,
                });
                res.send(newUser);
            } catch (err) {
                res.json(err);
        
            }
        
        }
    }
})

//login feature ------------------

app.post('/login', async (req, res) => { 
    const { email, password } = req.body; 
    
    const user = await User.findOne({ email });
    try {
        const isValid = await matchHash(password, user.password); 
        if (user && isValid) {
            
            // const accessToken = jwt(user, process.env.ACCESS_TOKEN_SECRET);
            // res.json({ accessToken: accessToken });     
            res.send(user);  
        } else {
            res.json("Enter valid credentials");
        }
    } catch (error) {
        // res.status(401);
        res.json(error);
    }

})
//authMiddleWare------------------------------------------
const authMiddleware = async (req, res, next) => {
   
    const { email, token } = req.body;
    try {
        const user = await User.findOne({ email });
        
        const newToken = user.token;
        if (user && (token === newToken)) {
            next();
            console.log("Authorization successful");
            return
        } else {
            res.json("User not authorized to see all users of the db");
        }
    } catch (err) {
        res.json(err);
    }
   
}
//loggerMiddleware--------------------------------------------------------------
const loggerMiddleware = async (req, res, next) => {
    console.log("This is logger middleware");
    next();
}
//users route-------------------
app.post('/users', loggerMiddleware ,  authMiddleware , async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (error) {
        // res.status(401);
        res.json(error);
    }
    
})
//--------------------------
// function authenticateToken(req, res , next) { 
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) {
//       return res.send("Token is Null");
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)
        
//         req.user = user;
//         next();
//     })
// }
app.listen(3000, console.log("listening"));
    

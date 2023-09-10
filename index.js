const express = require('express');
const User = require('./users');
app = express();

const mongoose = require('mongoose');
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
    
    app.listen(3000, console.log("listening"));
    

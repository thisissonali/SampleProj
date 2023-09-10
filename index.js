const express = require('express');
const User = require('./users');
app = express();

const mongoose = require('mongoose');
const DB = 'mongodb+srv://ranasonali987:osEgSlmRP0G5UbCE@cluster0.xgvlmk9.mongodb.net/sample?retryWrites=true&w=majority'

app.use('/', (req, res) => {
    res.send("Hello");
})

mongoose.connect(DB).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(`no connection`));

app.listen(3000, console.log("listening"));

User.find()
.then(function (users) {
console.log(users);
})
.catch(function (err) {
console.log(err);
});

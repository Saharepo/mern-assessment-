const express = require('express');
const app = express()
const cors = require("cors");
const bodyparser = require('body-parser')

app.use(bodyparser.json());
app.use(cors());

app.use("/userList", require("./controllers/userList"));

app.listen(8000, ()=>{
    console.log('Server listen on port: 8000');
})
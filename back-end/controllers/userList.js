const express = require('express');
const router = express.Router();

//Routes
router.get('/getTasks', getTasks)
router.get('/getUsers', getUsers)

//export router
module.exports = router;

async function getUsers(req,res){
    try {
        let userList = [
            {
            "id": 1,
            "name": "User-1"
            },
            {
            "id": 2,
            "name": "User-2"
            },
            {
            "id": 3,
            "name": "User-3"
            }
            ]

            return res.send({ "status": "true", "message": "Successfully fetched the data", "result": userList })
    } catch (error) {
        return res.send({ "status": "false", "error": error })
    }
}


async function getTasks(req,res){
    try {
        let taskList =  [
            {
            "Task": "Sample task -1",
            "Expiry_date": "10/21/2022",
            "User": 1,
            "Important": true,
            "Created_on": "01/10/2022"
            },
            {
            "Task": "Sample task -2",
            "Expiry_date": "03/03/2022",
            "User": 2,
            "Important": false,
            "Created_on": "01/10/2022"
            },
            {
            "Task": "Sample task -3",
            "Expiry_date": "05/30/2022",
            "User": 3,
            "Important": true,
            "Created_on": "01/10/2022"
            }
            ]

            return res.send({ "status": "true", "message": "Successfully fetched the data", "result": taskList })
    } catch (error) {
        return res.send({ "status": "false", "error": error })
    }
}


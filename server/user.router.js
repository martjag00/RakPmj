const express = require('express');
const router = express.Router();
const User = require("./user.model.js");
const bodyParser = require('body-parser');

/**gets all users*/
router.get("/users", (req,res) =>{
    User.find({}, (err, docs) =>{
        if(err) return handleError(err,res);
        res.status(200).json(docs);
    });
});


/** Delete all users*/
router.delete("/users", (req, res) =>{
    User.deleteMany({}, (err, docs) => {
        if(err) return handleError(err,res);
        console.log(docs);
        console.log("success delete many users");
        res.send(204);
    });
});

function handleError(err, res){
    console.log(err);
    res.send(500);
}


module.exports = router;
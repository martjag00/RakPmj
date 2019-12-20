const User = require("./user.model.js");
var jwt = require('jsonwebtoken');

exports.login = (req,res) =>{
    console.log("body", req.body);
    User.login(req.body)
        .then(user => {
            jwt.sign(user, process.env.privateKey, function(err, token) {
                if (err) return res.send(500);
                res.status(200).send({
                    user,
                    token,
                });
            });
        })
        .catch(err =>{
            res.send(401);
        });
};

exports.signup = (req, res)=>{
    User.signup(req.body)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err =>{
            res.send(500);
        });
};
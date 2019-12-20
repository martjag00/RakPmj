const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("./user.controller.js");
const jwt = require("jsonwebtoken");


const validationMiddleware =(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    next();
};
/**Login*/
router.post("/login", userController.login);

router.post("/verify", (req, res) => {
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader) return res.send(400);
    const token = bearerHeader.split(" ")[1];
    if(!token) return res.sendStatus(400);
    jwt.verify( token, process.env.privateKey, (err, decoded) => {
        if(err) return res.status(401).send(err);
        res.status(200).send(decoded);
    });
});


/**Creates a new user /signup*/
router.post("/signup", [
        check('email').isEmail().normalizeEmail(),
        check('password').isLength({ min: 8 }).withMessage("must be at least 8 chars long")
            .matches(/\d/).withMessage("must contain a number")
            .not().isIn(["123", "password", "god"]).withMessage("Do not use a common word as the password")
    ],
    validationMiddleware,
    userController.signup
);




module.exports = router;
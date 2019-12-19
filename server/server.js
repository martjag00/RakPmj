if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
const database = require("./database.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);

/** For images and bundle.js */
app.use("/static", express.static("dist/static"));

/** For index.html */
app.use("/*", express.static("dist"));

app.use(express.static("dist"));

function listen(){
    app.listen(PORT, () => {
        console.log("Server started", PORT);
        console.log(`http://localhost:${PORT}`);
    });
}

database.connect()
    .then (() => {
        listen();
    })
    .catch(err =>{
        console.error("error happened database",err);
    });

const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get("items/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

// mongoose.connect(DB_URL)
//     .then (() => {
//         console.log("database success");
//         // deleteAllItems();
//         migrate();
//         listen();
//     })
//     .catch(err =>{
//         console.error("error happened",err);
//     });

// /**
//  * miinused:
//  *  1. ei tea millal koik tooted on salvestatud
//  */

//

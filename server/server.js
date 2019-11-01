const express = require('express');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const DB = require("./database.js");

/* get all items*/
app.get("/api/items", (req, res)=>{
    res.json(DB.getItems())
});

/*get item ID järgi*/
app.get("/api/items/:itemId", (req, res)=>{
    res.send(DB.getItem(req.params.itemId));
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(express.static('dist'));

// heroku vajab process.env.PORT
app.listen(PORT, () => {
    console.log("Server started", PORT);
});
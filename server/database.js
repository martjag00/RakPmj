const mongoose = require("mongoose");
const Item = require("./item.model.js");
// const databaseMock = require("./database.mock.js");

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-5x1uj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connect = () => {
  return mongoose.connect(DB_URL)
      .then(() =>{
          console.log("Database access success!");
          migrate();
          return true;
      })
      .catch(err => {
          console.log("Database access err: ", err);
      });
};

function migrate() {
    Item.count({}, (err, countNr) => {
        if (err) throw err;
        if (countNr > 0){
            console.log("already had items, dont save");
            return;
        }
        saveAllItems();
    });
}

function deleteAllItems(){
    Item.deleteMany({}, (err, doc)=> {
        console.log('err', err, "doc", doc);
    });
}

function saveAllItems(){
    console.log("migrate started");
    const items= DB.getItems();
    items.forEach(item =>{
        const document = new Item(item);
        document.save( (err) =>{
            if(err){
                console.log(err);
                throw new Error("Something happened during save.");
            }
            console.log('save success');
        })
    });
    console.log("items", items);
}

module.exports = {
    connect,
};
// const getItems= () => {
//     const items = [];
//     phones.forEach( (phone, index)=>{
//         items.push({
//             ...phone,
//             // id: "phones-"+index,
//             category: "phones",
//             price: cleanPrice(phone.price),
//         });
//     });
//     laptops.forEach( (laptop, index)=>{
//         items.push({
//             ...laptop,
//             // id: "laptops-"+index,
//             category: "laptops",
//             price: cleanPrice(laptop.price),
//         });
//     });
//     return items;
// };

// const getItem = (itemId) =>{
//     return getItems().find( item => item.id === itemId);
// };

// const cleanPrice = (dirty) => {
//     //removes to
//     const parts = dirty.split("to");
//     //replace
//     return parts[0].replace("$", "");
// };

// module.exports = {
//     getItems,
//     getItem
// };
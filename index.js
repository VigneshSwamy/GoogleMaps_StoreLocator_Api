const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Store = require("./Models/storedata");

mongoose.connect(
  "mongodb+srv://viswa2_maps:MSHl55jgGtdJwchw@cluster0.64smb.mongodb.net/storeDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const port = 3000;

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//app.use(express.json()) // for parsing application/json
// if errored out- PayloadTooLargeError: request entity too large
app.use(express.json({ limit: "50mb" })); // for parsing application/json

app.get("/", (req, res) => {
  res.send("Google maps service is up and running !!!");
});

app.post("/api/stores", (req, res) => {
  let dbStores = [];
  ////// Testing to push from nodejs api to MongoDB Atlas
  // var storepush = new Store({
  //   id: 15051,
  //   storeName: "La Cienega & Gregory Way",
  //   phoneNumber: "310-659-9562",
  //   address: "257 S. La Cienega Blvd.",
  //   openStatusText: "Open until 6:00 PM",
  //   addressLines: null,
  //   location: {
  //     type: "Point",
  //     coordinates: [-118.3764, 34.063584]
  //   }
  // });
  // storepush.save();
  let storesObject = req.body;
  storesObject.forEach(storeitem => {
    dbStores.push({
      storeName: storeitem.name,
      phoneNumber: storeitem.phoneNumber,
      address: storeitem.address,
      openStatusText: storeitem.openStatusText,
      addressLines: storeitem.addressLines,
      location: {
        type: "Point",
        coordinates: [
          storeitem.coordinates.latitude,
          storeitem.coordinates.longitude,
        ],
      },
    });
  });
  Store.create(dbStores,(err,stores)=>{
    if(err){
      res.status(500).send(err);
    }
    else{
      res.status(200).send(stores);
    }
  });  
});

app.get('/api/stores', (req,res)=>{
 Store.find({},(err,str)=>{
  if(err){
    res.status(500).send(err);
  }
  else{
    res.status(200).send(str);
  }
 })

});

app.delete("/api/stores", (req, res) => {
  Store.deleteMany({}, (err) => {
    res.status(200).send("Delete of records completed "+  err);
  });
});

app.listen(port, () => {
  console.log("Server starting for google maps !!");
});

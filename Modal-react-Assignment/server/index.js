const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");
//----------------------------------
const app = express();
//----------------------------------
/* app
.use(express.static(__dirname+"/public"))
.use(express.static(__dirname))
.use(express.json()); */
app.use(express.json());
app.use(cors());
//----------------------------------
 const url = `mongodb+srv://${config.dbuser}:${config.dbpass}@cluster0.${config.dbstring}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
 
// DB Config ORM (object relational mapping)
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let User = mongoose.model("User", new Schema({
    id : ObjectId,
    firstname : String,
    lastname : String,
    email : String,
}));
 
mongoose.connect(url)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log("Error  ", err));
//----------------------------------
// READ
app.get("/data", (req, res) => {
    User.find().then(dbres => {
        res.status(200).json(dbres);
    }).catch(err => console.log("Error ", err))
});
// CREATE
app.post("/data", (req, res) => {
    let user = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,

        email : req.body.email
    });
    user.save()
    .then(dbres => res.status(200).send({ message : dbres.firstname+" is added"}))
    .catch((err)=>console.log("Error  ", err))
});
app.post("/edit/:id", (req, res) => {
    User.findByIdAndUpdate({_id : req.params.id },req.body)
    .then((dbres)=> res.status(200).send({ message : dbres.firstname+"'s details were updated" }))
    .catch((err)=> console.log("Error ", err))
});
 
// EDIT
app.get("/edit/:id", (req, res)=>{
    User.findById({ _id : req.params["id"] })
    .then(dbres => res.status(200).send(dbres))
    .catch(err => console.log("Error ", err));
})
// DELETE
app.delete("/delete/:id",(req, res) => {
    User.findByIdAndDelete({ _id : req.params.id })
    .then(dbres => res.status(200).send({ message : dbres.firstname+" was deleted" }))
    .catch(err => console.log("Error ", err))
})
//----------------------------------
app.listen(config.port,config.host,(err)=>{
    err ? console.log("Error ", err) : console.log(`server is now live on ${config.host}:${config.port}`)
})
//----------------------------------
 
 
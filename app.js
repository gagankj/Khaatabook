const express = require('express');

const app=express()

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("Home")
})

app.get("/create",(req,res)=>{
    res.render("Create")
})

app.listen(3000,()=>{
    console.log("Server is running at localhost:3000")
})
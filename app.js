const express = require('express');
const fs=require("fs")
const app=express()

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/",(req,res)=>{
    fs.readdir("./files",(err,files)=>{

        res.render("Home",{files})
    })
})

app.get("/create",(req,res)=>{
    res.render("Create")
})
const date=new Date()
const day=date.getDate()
// console.log(day);
const month=date.getMonth()+1
const year=date.getFullYear()
const fn=`${day}-${month}-${year}.txt`
// console.log(fn);

app.post("/create",(req,res)=>{
    fs.writeFile(`files/${fn}`,req.body.details,(err)=>{
        if (err) throw err
        // console.log(req);
    })
    res.redirect("/")
})

app.get("/view/:fileName",(req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`,(err,data)=>{

        res.render("View",{data})
    })
})

app.listen(3000,()=>{
    console.log("Server is running at localhost:3000")
})


app.get("/edit/:editFile",(req,res)=>{
    fs.readFile(`./files/${req.params.editFile}`,(err,data)=>{
        res.render("Edit",{data,fileName:req.params.editFile})
    })
})

app.post("/append/:filename",(req,res)=>{
    fs.writeFile(`./files/${req.params.filename}`,req.body.details,(err)=>{
        if (err) throw err
    })
    res.redirect("/")
//    console.log(req.body);
})




app.get("/delete/:filename",(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if (err) throw err
    })

    res.redirect("/")
})
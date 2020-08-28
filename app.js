const express = require('express');
const appRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todoSchema');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/todo", { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");

// var todoList = [
//     'test1',
//     'test2'
// ]

appRouter.route('/')
    .get((req,res)=>{
      Todo.find({}, function(err, todoList) {
          if(err){
              console.log(err);
          }
          else{
            res.render("index.ejs", {todoList: todoList});
          }
      })
        
    })

appRouter.route('*')
    .get((req,res) => {
        res.end("<h1>Invalid page</h1>");
    })

appRouter.route('/newtodo')
.post((req,res)=>{
    console.log("item done");
    // var item = req.body.item;
    var newItem = new Todo({
        name:req.body.item
    })
    // todoList.push(item);
    Todo.create(newItem)
      .then((data) => {
        console.log(newItem);
      })
      .catch(err => {
        console.log(err);
      });
    res.redirect("/");
})

app.use('/',appRouter)


app.listen(80, () => {
    console.log('App is running at 80');
});
const express=require('express');
const { Todo }=require("./models")
const app=express();
const bodyParser=require('body-parser')
app.use(bodyParser.json());


app.get("/todos",(req,res)=>{
    console.log("Todo List")
})

app.post("/todos",async (req,res)=>{
    // console.log("Creating Todo List :",req.body)
    try{
        const todo=await Todo.addTodo({title:req.body.title,dueDate:req.body.dueDate,completed:req.body.completed})
        return res.json(todo);
    }catch(err){
        console.log(err);
        return res.status(422).json(err);
    }
})

app.put("/todos/:id/markAsCompleted",async (req,res)=>{
    console.log("We have updated record with id :",req.params.id)
    
    try{
        const todo=await Todo.findByPk(req.params.id)
        const updatedTodo=await todo.markAsCompleted()
        return res.json(updatedTodo);
    }catch(err){
        console.log(err);
        return res.status(422).json(err);
    }
})
app.delete("/todos/:id",(req,res)=>{
    console.log("Delete record with id :",req.params.id)
})

app.listen(3000,()=>{
    console.log("Server is listening at 3000");
})
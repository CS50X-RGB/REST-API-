const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json()); //REQ.BODY

app.get("/todos",async(req,res) =>{
    try {
        const allTodos = await pool.query("SELECT * from TODO");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.put("/todos/:id",async(req,res) =>{
    try {
      const { _id } = req.params;//WHERE
      const { DESCP } = req.body; //SET
      const updateTodo = await pool.query("UPDATE TODO SET DESCP = ($1) WHERE _id = ($2)",
      [DESCP,_id]
      );
      res.json("TODO IS UPDATED");       
    } catch (err) {
        console.err(err.message);
    }
})

app.delete("/todos/:id", async(req,res) => {
    try{
      const { _id } = req.params;
      const deleteToDo = await pool.query("DELETE FROM TODO WHERE _ID = ($1)",[_id]);
      res.json(deleteToDo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})


app.post("/todos",async(req,res) =>{
    try{
      const { DESCP } = req.body;
      const newTodo = await pool.query("INSERT INTO TODO (DESCP) VALUES ($1) RETURNING *"
      ,[DESCP]
      );
      res.json(newTodo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

app.get("/todos/:_id",async(req,res) =>{
    const { _id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM TODO WHERE _id = ($1)",
        [_id ]);
        res.json(todo.rows);
      } catch (err) {
        console.error(errmessage);
      }
})



app.listen(5000, () => {
   console.log("Server is running at port 5000");
})

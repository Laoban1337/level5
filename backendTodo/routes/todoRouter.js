const express = require("express");

const todoRouter = express.Router();

const { v4: uuidv4 } = require("uuid");

const todos = [
  {
    name: "Buy groceries",
    description: "Purchase fruits, vegetables, and dairy products",
    imageUrl: "http://www.myimage.com/groceries.jpg",
    completed: false,
    _id: uuidv4(),
  },
  {
    name: "Clean the house",
    description: "Vacuum, dust, and mop all rooms",
    imageUrl: "http://www.myimage.com/cleaning.jpg",
    completed: false,
    _id: uuidv4(),
  },
  {
    name: "Finish project report",
    description: "Complete the final draft of the project report for work",
    imageUrl: "http://www.myimage.com/report.jpg",
    completed: false,
    _id: uuidv4(),
  },
  {
    name: "Exercise",
    description: "Go for a 30-minute run in the park",
    imageUrl: "http://www.myimage.com/exercise.jpg",
    completed: false,
    _id: uuidv4(),
  },
];

//get all todos
todoRouter.get("/", (req, res) => {
  res.send(todos);
});

//get one todo by id
todoRouter.get("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const foundTodo = todos.find((todo) => todo._id === todoId);
  if (foundTodo) {
    res.send(foundTodo);
  } else if (!foundTodo) {
    res.status(404).send("nothing found by that name or Id");
  }
});

//postOne
todoRouter.post("/", (req, res) => {
  const newTodo = req.body;
  newTodo._id = uuidv4();
  todos.push(newTodo);

  res.send(`added ${newTodo.name}`);
});

//update one by ID

todoRouter.put("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const updates = req.body;
  const todoIndex = todos.findIndex((todo) => todo._id === todoId);
  updatedTodo = Object.assign(todos[todoIndex], updates);
  res.send(updatedTodo);
});

//delete todo by id

todoRouter.delete("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo._id === todoId);
  todos.splice(todoIndex, 1);
  res.send(
    `You have deleted a todo with the Id of ${todoId} from the todo list`
  );
});

module.exports = todoRouter;

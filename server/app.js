import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for users and todos (replace this with a database in a real application)
let users = [];
let todos = [];

// Middleware function for authorization
const authorize = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== 'my_secret_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Sign up
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = { username, password };
  users.push(newUser);
  return res.status(201).json(newUser);
});

// Sign in
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  // In a real application, you would generate and return a JWT token here
  return res.status(200).json({ message: 'Sign in successful', token: 'my_secret_token' });
});

// CRUD operations for todos
// Create
app.post('/todos', authorize, (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  return res.status(201).json(newTodo);
});

// Read all
app.get('/todos', authorize, (req, res) => {
  return res.status(200).json(todos);
});

// Update
app.put('/todos/:id', authorize, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos[todoIndex].title = title;
  return res.status(200).json(todos[todoIndex]);
});

// Delete
app.delete('/todos/:id', authorize, (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const deletedTodo = todos.splice(todoIndex, 1);
  return res.status(200).json(deletedTodo);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
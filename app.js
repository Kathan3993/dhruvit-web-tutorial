const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
// Example data for users
let users = [
  { id: "5abf6783", firstName: "Kathan", email: "kathan@gmail.com" },
  { id: "5abf674563", firstName: "Soumya", email: "soumya@gmail.com" },
];

// GET API to retrieve all users
app.get("/users", (req, res) => {
  res.json({
    message: "Users retrieved",
    success: true,
    users: users,
  });
});

// PUT API to update an existing user by ID
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { email, firstName } = req.body;
  let userToUpdate = users.find((user) => user.id === id);
  console.log(userToUpdate);
  if (!userToUpdate) {
    res.status(404).json({ message: "User not found", success: false });
  } else {
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.firstName = firstName || userToUpdate.firstName;
    res.json({ message: "User updated", success: true });
  }
});

// POST API to add a new user
app.post("/add", (req, res) => {
  const { email, firstName } = req.body;
  const id = (Math.random() * 100000000).toString(); // Generate random ID
  users.push({ id, firstName, email });
  res.json({ message: "User added", success: true });
});

// GET API to retrieve a single user by ID
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).json({ message: "User not found", success: false });
  } else {
    res.json({ success: true, user });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const express = require("express");
const app = express();

const users = require("./MOCK_DATA.json");
const fs = require("fs");
const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.get("/api/users", (req, res) => {
  res.json({ users });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/api/users", (req, res) => {
  const body = req.body;

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving user" });
    } else {
      console.log("id:", users.length);
      res.json(body);
    }
  });

  res.json(body);
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    const updateUser = { ...user, ...req.body };
    const index = users.findIndex((user) => user.id === id);
    users[index] = updateUser;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating user" });
      } else {
        res.json(updateUser);
      }
    });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting user" });
      } else {
        res.json({ message: "User deleted successfully" });
      }
    });
  }
});

/** @format */

const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const app = express();

const secret = "secret";

app.use(express.json());

let users = [];

const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

app.post("/signup", (req, res) => {
  try {
    const validatedUser = userSchema.parse(req.body);
    const existingUser = users.find(
      (user) => user.email === validatedUser.email
    );
    if (existingUser) {
      return res.status(409).send({ message: "Email is already registered" });
    }
    users.push(validatedUser);
    return res.send({ message: "You have successfully signed up" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ errors: error.errors });
    }
    return res.status(500).send({ message: "An error occurred" });
  }
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const token = jwt.sign({ email: user.email }, secret);
    res.send({ token });
    console.log(user);
  } else {
    res.status(403).send({ message: "Invalid Email or Password" });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  if (decoded.email) {
    req.email = decoded.email;
    next();
  } else {
    res.status(401).send({ message: "No token provided" });
  }
}

app.get("/me", auth, (req, res) => {
  const user = users.find((user) => user.email === req.email);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send({ name: user.name, email: user.email });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});

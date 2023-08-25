require("dotenv").config(); //DotENV
const OpenAI = require("openai"); //OpenAI
const express = require("express"); //Express
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const secretKey = "process.env.PRIVATE_KEY";
const app = express();
app.use(express.json(), bodyParser.urlencoded({ extended: true })); // Parse JSON data in request body

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_KEY,
// });

// async function main(key) {
//   const image = await openai.images.generate({
//     //key = {'prompt':'XYZ', size:'256x256', bool:1}
//     prompt: key["prompt"],
//     n: 1,
//     size: key["size"],
//   });

//   return image.data;
// }

const authenticate = (req, res, next) => {
  console.log(req.body);
  const token = req.body["Authorization"];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

const users = {
  user1: { username: "user1", password: "password1" },
  user2: { username: "user2", password: "password2" },
};

app.post("/image", authenticate, async (req, res) => {
  const dataFromClient = req.body;
  console.log(dataFromClient);
  res.send("Successful");

  //var imageLink = await main(dataFromClient);
  //console.log("Received data from client:", dataFromClient, "\n", imageLink);
  //res.send(imageLink);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users[username];

  if (user && user.password === password) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).send("Invalid username or password.");
  }
});

app.get("/auth", authenticate, (req, res) => {
  res.send(`${req.user.username} Logged!`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

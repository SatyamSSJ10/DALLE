const OpenAI = require("openai"); //OpenAI
const express = require("express"); //Express
const mongoDB = require("mongodb");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const secretKey = "This is a secret key";
const app = express();

mongoURL =
  "mongodb+srv://aws-tokyo-DALLE:NB8HyC9ho8Z3Zu08@cluster0.akwjgsr.mongodb.net/?retryWrites=true&w=majority";

const mongo_client = new mongoDB.MongoClient(mongoURL);

async function mongo_run() {
  try {
    await mongo_client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    return null;
  }
}
//Client Connect
mongo_run();

async function fetch_user(user) {
  try {
    const database = await mongo_client.db("DALLE");
    const collection = database.collection("users");
    const result = await collection.findOne({ username: user });
    return result;
  } catch (err) {
    return null;
  }
}

app.use(express.json(), bodyParser.urlencoded({ extended: true })); // Parse JSON data in request body

const openai = new OpenAI({
  apiKey: "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",
});

async function main(key) {
  const image = await openai.images.generate({
    //key = {'prompt':'XYZ', size:'256x256', bool:1}
    prompt: key["prompt"],
    n: 1,
    size: key["size"],
  });

  return image.data;
}

app.use((req, res, next) => {
  const clientHost =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const clientPort = req.socket.remotePort;
  console.log(
    `Received ${req.method} request from ${clientHost}:${clientPort} at ${req.url}`
  );
  next();
});

const authenticate = (req, res, next) => {
  console.log(req.body);
  const token = req.body["Authorization"];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

app.post("/image", authenticate, async (req, res) => {
  const dataFromClient = req.body;
  console.log(dataFromClient);
  //res.send("https://i.imgur.com/OVP4uQq.jpg");

  var imageLink = await main(dataFromClient);
  console.log("Received data from client:", dataFromClient, "\n", imageLink);
  res.send(imageLink[0]["url"]);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await fetch_user(username);

  if (user && user.password === password) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    console.log("Failed Login Attempt");
    res.status(401).send("Invalid username or password.");
  }
});

app.post("/auth", authenticate, (req, res) => {
  res.send(`${req.user.username} Logged!`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

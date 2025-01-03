import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import fs from "fs"
// import { dirname } from "path"
// import { fileURLToPath } from "url"

// server variables
const app = express();
const port = 3000;
const data = fs.readFileSync("./todo-list.txt").toString().split("\n");

console.log(data.length);

// get current working  directory
// const __dirname = dirname(fileURLToPath(
// import.meta.url));

// parses the data for js to understand
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs", { tasks: data })
});

// Server up
app.listen(port, () => {
    console.log(`The server is now running at localhost:${port}`);
});
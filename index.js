import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import fs from "fs"
// import { dirname } from "path"
// import { fileURLToPath } from "url"

// server variables
const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

// get current working  directory
// const __dirname = dirname(fileURLToPath(
// import.meta.url));

// parses the data for js to understand

app.post("/add", (req, res) => {
    const entry = req.body["newTask"];
    fs.appendFile("todo-list.txt", `${entry}\n`, (err) => {
        if (err) {
            console.error(err);
        }
    });
    res.redirect("/")

});

app.get("/", (req, res) => {
    const data = fs.readFileSync("./todo-list.txt", "utf8"); //.toString().split("\n");
    const taskList = data.split('\n').filter(newTask => newTask.trim() !== '');
    res.render("index.ejs", { tasks: taskList })
});

// Server up
app.listen(port, () => {
    console.log(`The server is now running at localhost:${port}`);
});
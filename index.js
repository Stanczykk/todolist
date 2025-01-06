import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import fs from "fs"
// import { dirname } from "path"
// import { fileURLToPath } from "url"

// server variables
const app = express();
const port = 3000;
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

app.post("/delete", (req, res) => {
    const tasksToDelete = req.body.tasksToDelete; // Array of tasks to delete

    if (!tasksToDelete) {
        return res.redirect('/'); // No tasks selected, just redirect back
    }

    fs.readFile("./todo-list.txt", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Failed to load tasks');
        }

        // Get current tasks
        const tasks = data.split('\n').filter(task => task.trim() !== '');

        // Filter out the tasks to delete
        const updatedTasks = tasks.filter(task => !tasksToDelete.includes(task));

        // Rewrite the file with the updated tasks
        fs.writeFile("./todo-list.txt", updatedTasks.join('\n'), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Failed to delete tasks');
            }

            res.redirect('/'); // Redirect back to the list
        });
    });
});



// });

app.get("/", (req, res) => {
    const data = fs.readFileSync("./todo-list.txt", "utf8"); //.toString().split("\n");
    const taskList = data.split('\n').filter(newTask => newTask.trim() !== '');
    res.render("index.ejs", { tasks: taskList })
});

// Server up
app.listen(port, () => {
    console.log(`The server is now running at localhost:${port}`);
});
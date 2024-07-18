import 'dotenv/config'; // Load the .env file
// To get an env variable: process.env.VARIABLE_NAME

// Server-Side Configs
let ss_configs = {
    "port": 1337
}

// Client-side configs
let configs = {
    "title": "Aurora Inns",
}

// Imports
import express from 'express';
import hbs from 'express-handlebars';

// Create Express App
const app = express();

// Set Middleware
const __dirname = new URL('.', import.meta.url).pathname;
app.set("view engine", "hbs");  // Set the view engine to handlebars
app.set("views", __dirname + "/views")  // Set the views directory
app.use(express.static('static'))
app.engine('hbs', hbs.engine({ 
    layoutsDir: __dirname + "/views/layouts", // Set Layouts Directory 
    partialsDir: __dirname + "/views/partials", // Set Partials Directory
    extname: 'hbs', // Set the extension to .hbs
    defaultLayout: 'index' // Set the default layout
}));

// Get a random Cat image URL
async function getCat() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        const url = data[0].url;
        console.log(url)
        return await url;
    } catch (error) {
        console.error(error.message)
    }
}


// Main Route
app.get("/", async (req, res) => {
    configs.loggedIn = false;
    res.render("main", configs)
});

app.get("/login", async (req, res) => {
    res.render("auth/login", configs)
});

app.get("/logout", async (req, res) => {
    res.render("auth/logout", configs)
});

app.get("/forgot", async (req, res) => {
    res.render("auth/reset_pw", configs)
});

app.get("/update_pw", async (req, res) => {
    res.render("auth/update_pw", configs)
});

app.get("/register", async (req, res) => {
    res.render("auth/register", configs)
});

app.get("/profile", async (req, res) => {
    configs.loggedIn = true;
    res.render("profile", configs)
})

app.get("/dashboard", async (req, res) => {
    configs.catURL = await getCat()
    configs.loggedIn = true;
    res.render("dashboard", configs)
});

app.get("/errors/404", async (req, res) => {
    res.render("errors/404")
});

app.get("/errors/401", async (req, res) => {
    res.render("errors/401")
});
app.get('*', function(req, res){
    res.render('errors/404') // Renders the 404 Page
  });


// Run App
app.listen(ss_configs.port, () => {
    console.log(`Server is running on port ${ss_configs.port}`);
});
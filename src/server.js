const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(".hbs", exphbs({ // Configuración del templating engine 
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
})); 
app.set("view engine", ".hbs") 


// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); // Parsing data
app.use(methodOverride("_method"));


// Global Variables

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/blog.routes"));
app.use(require("./routes/dashboard.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));


module.exports = app;
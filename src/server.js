require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

// Initializations
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(".hbs", exphbs({ // Configuración del templating engine 
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: {
        date: function(date) {
            return date.toLocaleDateString();
        }
    }
})); 
app.set("view engine", ".hbs") 


// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false})); // Parsing data
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret: "secretword",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    next();
});

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/blog.routes"));
app.use(require("./routes/dashboard.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));


module.exports = app;
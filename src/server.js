if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const moment = require("moment");
const morgan = require("morgan");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const session = require("express-session");

// Initializations
const app = express();
require("./config/passport")(passport);

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
            moment.locale("es");
            return moment(date).format("l");
        }
    }
})); 
app.set("view engine", ".hbs") 


// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true})); // Parsing data
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret: "secretword",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single("file"));




// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

// Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/blog.routes"));
app.use(require("./routes/dashboard.routes"));
app.use(require("./routes/users.routes"));
app.use(require("./routes/patients.routes"));


// Static files
app.use(express.static(path.join(__dirname, "public")));


module.exports = app;
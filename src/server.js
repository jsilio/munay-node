if (process.env.NODE_ENV == 'production') {
    require('dotenv').config();
}

const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const moment = require("moment");
const morgan = require("morgan");
const multer = require("multer");
const multers3 = require("multer-s3");
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const AWS = require("aws-sdk");
const readingTime = require("reading-time");


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
});


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
        readTime: function (content) {
            const stats = readingTime(content);
            return Math.ceil(stats.minutes.toFixed(2));
        },

        date: function (date, format) {
            moment.locale("es");
            return moment(date).format(format); // MMM DD, YYYY
        },

        initial: function (string) {
            return string.charAt(0).toUpperCase();
        }

    }
}));
app.set("view engine", ".hbs")


// Middlewares
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // Parsing data
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

// Multer Configuration
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "public/uploads"),
//     filename: (req, file, cb) => {
//         cb(null, new Date().getTime() + path.extname(file.originalname));
//     }
// });

const uploadS3 = multer({
    storage: multers3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});

app.use(uploadS3.single("file"));


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

// Error 404
app.use(function (req, res, next) {
    req.app.locals.layout = "main";
    res.status(404).render('error404.hbs');
});


module.exports = app;
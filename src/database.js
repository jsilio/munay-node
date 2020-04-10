const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://localhost/munay"

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err));
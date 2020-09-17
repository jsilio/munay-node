const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err));


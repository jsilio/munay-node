const app = require("./server");
require("./database");


// Listen
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});
const express = require("express");
require("./src/bot");

// use express
const app = express();

process.on("SIGINT", function () {
    //graceful shutdown
    console.log("Server closed.");
    process.exit();
});

// listen for http://localhost:3000/...
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

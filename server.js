const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

const router = express.Router();
app.use("/", router);
require("./controllers/posts")(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
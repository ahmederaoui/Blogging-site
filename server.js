const express = require('express');
require('@prisma/client');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const expressValidator =   require ('express-validator')
app.use(expressValidator())
app.use(bodyParser.json())
 
const userRoute=require("./routes/route.user");
app.use("/api/",userRoute);

const articleRoute=require("./routes/route.article");
app.use("/api/",articleRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
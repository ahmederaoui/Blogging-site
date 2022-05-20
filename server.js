const express = require('express');
require('@prisma/client');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
 
const userRoute=require("./routes/route.user");
app.use("/api/",userRoute);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
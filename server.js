const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const path = require("path");

// configure cors
app.use(cors());

// configure express to receive form data from client
// app.use(express.json());
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));

// dotEnv Configuration
dotEnv.config({path : './.env'});

const port = process.env.PORT || 5000;

// mongoDB Configuration
mongoose.connect(process.env.MONGO_DB_CLOUD_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false,
    useCreateIndex : true
}).then((response) => {
    console.log('DB Connected');
}).catch((error) => {
    console.error(error);
    process.exit(1); // stop the process if unable to connect to mongodb
});

// simple URL


// router configuration
app.use('/api/users' , require('./router/userRouter'));
app.use('/api/posts' , require('./router/postRouter'));
app.use('/api/profiles' , require('./router/profileRouter'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "client/build", "index.html"));
      });
}


app.listen(port, () => {
    console.log(`Express Server is Started at PORT : ${port}`);
});
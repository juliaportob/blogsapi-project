const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controller/userController');
const loginRouter = require('./controller/loginController');
const postRouter = require('./controller/postController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Listening port 3000!'));

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);

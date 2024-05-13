require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');

const port = process.env.PORT || 8000;

// app.get('/api', (req, res) => {
//     res.json({
//         status: 200,
//         message: 'Hii, I am Sahu here..!!'
//     });
// });

app.use(express.json());

app.use('/api/users', userRouter);

app.listen(port, () => {
    console.log('Server Up, Running Sucessfully On Port :', port);
});
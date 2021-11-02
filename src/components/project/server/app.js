const express = require('express');

const app = express();

//MIDDLEWARE
app.use('/projects')


//ROUTES
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/projects', (req, res) => {
    res.send('Welcome to our projects page');
});

//How to start listening to the server
app.listen(3000);
const express = require('express');
const app = express();
const path = require('path');

//middleware to check if the time is valid 
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date(); 
    const day = date.getDay(); //sunday to saturday
    const hour = date.getHours();  //between 9-5

//check if day (monday-friday) and between (<9-5)
if (day >=1 && day <=5 && hour >= 9 && hour <17) {
    next();
}else {
    res.send("we are not available")
}
};

app.use(express.static(path.join(__dirname, 'public')));//middleware for public
// Middleware to use EJS template engine
app.set('view engine', 'ejs');
app.set('viewss', path.join(__dirname, 'viewss'));

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('home');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact');
});

// Start server
const PORT = 1692;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

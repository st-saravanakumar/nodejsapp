const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Team!');
});


app.use('/api', productRoutes);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/nodejsapp');
    console.log("database connected");

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});
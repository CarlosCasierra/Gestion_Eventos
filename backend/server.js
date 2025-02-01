const connectDB = require('./src/api/db');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const eventsRoutes = require('./src/routes/eventsRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const middleware = require('./src/routes/middlewareRoutes');

dotenv.config();


const app = express();


app.use(cors({
    origin: 'http://localhost:3000', // Asegúrate de permitir tu frontend en localhost
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Asegúrate de permitir Authorization
}));


app.use(express.json());

app.use('/api', middleware);
app.use('/api/events', eventsRoutes);
app.use('/api/users', usersRoutes);


const PORT = process.env.PORT || 5001;

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/db.js'; // Import the database configuration
// Routes
import routes from './routes/index.js'; // Import all routes

// Initialize the app
dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use('/api', routes); // User authentication routes

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

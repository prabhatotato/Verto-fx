require('dotenv').config()
const express = require('express');
const cors = require('cors'); // <-- import cors
const employeeRouter = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 3000;
console.log(`Starting server on port ${PORT}`);


// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));
app.use('/api/employees', employeeRouter);

app.get('/', (req, res) => {
    // A simple, clear message for the API entry point
    res.status(200).json({
        message: "Welcome to the Employee Management API!",
        documentation: "/api-docs" // Placeholder for documentation link
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
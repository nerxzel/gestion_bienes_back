const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
    res.send('The Backend is running!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
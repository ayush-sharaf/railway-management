const app = require('./app');
const sequelize = require('./models/db');
const User = require('./models/userModel');
const Train = require('./models/trainModel');
const Booking = require('./models/bookingModel');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.sync(); // Sync models with the database
        console.log('Database synced.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
})();

const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./userModel');
const Train = require('./trainModel');

const Booking = sequelize.define('Booking', {
    seat_count: { type: DataTypes.INTEGER, allowNull: false },
    booking_time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Train, { foreignKey: 'trainId' });

module.exports = Booking;

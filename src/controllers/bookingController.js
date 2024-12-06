const Train = require('../models/trainModel');
const Booking = require('../models/bookingModel');

const bookSeat = async (req, res) => {
    const { trainId, seat_count } = req.body;
    const userId = req.user.id;

    try {
        // Start a transaction to handle concurrency
        const result = await Train.sequelize.transaction(async (t) => {
            // Lock the train row for the booking process
            const train = await Train.findOne({
                where: { id: trainId },
                lock: true,
                skipLocked: true, // Skip rows locked by other transactions
                transaction: t,
            });

            if (!train) {
                throw new Error('Train not found');
            }

            if (train.available_seats < seat_count) {
                throw new Error('Insufficient seats available');
            }

            // Update seat availability atomically
            train.available_seats -= seat_count;
            await train.save({ transaction: t });

            // Create the booking record atomically
            const booking = await Booking.create(
                {
                    trainId,
                    userId,
                    seat_count,
                },
                { transaction: t }
            );

            return booking; // Return booking to the caller
        });

        // Return success response
        res.status(201).json({
            message: 'Booking successful',
            booking: result,
        });
    } catch (error) {
        // Handle any errors that occurred during the transaction
        res.status(400).json({
            message: 'Booking failed',
            error: error.message,
        });
    }
};

const getBookingDetails = async (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;

    try {
        // Retrieve booking details for the logged-in user
        const booking = await Booking.findOne({
            where: { id: bookingId, userId },
        });

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found',
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch booking details',
            error: error.message,
        });
    }
};

module.exports = { bookSeat, getBookingDetails };

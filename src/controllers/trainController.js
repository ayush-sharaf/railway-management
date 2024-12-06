const Train = require('../models/trainModel');

const addTrain = async (req, res) => {
    const { train_name, source, destination, total_seats } = req.body;

    try {
        const train = await Train.create({ train_name, source, destination, total_seats, available_seats: total_seats });
        res.status(201).json({ message: 'Train added successfully', train });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add train', error });
    }
};

const getTrains = async (req, res) => {
    const { source, destination } = req.query;

    try {
        const trains = await Train.findAll({ where: { source, destination } });
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch trains', error });
    }
};

module.exports = { addTrain, getTrains };

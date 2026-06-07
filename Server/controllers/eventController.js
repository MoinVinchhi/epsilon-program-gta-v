import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import { v2 as cloudinary } from 'cloudinary';
import User from '../models/User.js';

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addEvents = async (req, res) => {
    const { title, description, date, time, venue, duration, points } = req.body;
    const file = req.files && req.files.file;

    if (!title || !description || !date || !time || !venue || !duration ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('File received:', file);
    const options = {
        folder: "events",
        quality: 90,
        resource_type: "auto",
    };

    try {
        if (!file.tempFilePath) {
            console.error('Temp file path is missing');
            return res.status(400).json({ error: 'File path is missing' });
        }

        const response = await cloudinary.uploader.upload(file.tempFilePath, options);

        const newEvent = new Event({
            title,
            description,
            date,
            time,
            image: response.secure_url,
            venue,
            duration,
            points,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        await Event.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateEvent = async (req, res) => {
    const { title, description, date, time, image, venue, duration } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, description, date, time, image, venue, duration, points },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const eventRegister = async (req, res) => {
    const { eventId, eventName, name, email, phone, eventPoint } = req.body;

    // Validate required fields
    if (!eventId || !eventName || !name || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Convert eventPoint to a number
    const convertedEventPoint = Number(eventPoint);
    if (isNaN(convertedEventPoint)) {
        return res.status(400).json({ error: 'Invalid eventPoint value' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure user.points is a number
        if (typeof user.points !== 'number' || isNaN(user.points)) {
            return res.status(500).json({ error: 'User points are not valid' });
        }

        // Determine points to deduct based on membership ID
        let pointsToDeduct;
        switch (user.membership_id) {
            case 1:
                pointsToDeduct = 10;
                break;
            case 2:
                pointsToDeduct = 20;
                break;
            case 3:
                pointsToDeduct = 30;
                break;
            default:
                return res.status(400).json({ error: 'Invalid membership ID' });
        }

        // Ensure pointsToDeduct is a number
        pointsToDeduct = Number(pointsToDeduct);
        if (isNaN(pointsToDeduct)) {
            return res.status(400).json({ error: 'Invalid points to deduct' });
        }

        // Calculate the new points
        let newPoints = user.points - (convertedEventPoint - .01*pointsToDeduct);

        // Ensure points do not go below zero
        newPoints = Math.max(newPoints, 0);

        // Update user points
        user.points = newPoints;
        await user.save();

        // Create the registration
        const newRegistration = new Registration({
            eventId,
            eventName,
            name,
            email,
            phone,
        });

        // Save registration
        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);

    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(500).json({ error: 'Failed to register' });
    }
}


export {
    getEvents,
    addEvents,
    deleteEvent,
    updateEvent,
    eventRegister
};

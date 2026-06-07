import Volunteer from '../models/Volunteer.js';
import Event from '../models/Event.js';

const getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addVolunteer = async (req, res) => {
    const { eventId,  name, email, message, status } = req.body;

    if (!eventId || !name || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newVolunteer = new Volunteer({
            eventId,
            // eventName,
            name,
            email,
            message,
            status: 'pending',
        });

        const savedVolunteer = await newVolunteer.save();
        res.status(201).json(savedVolunteer);
    } catch (error) {
        console.error('Error creating volunteer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteVolunteer = async (req, res) => {
    try {
        const volunteerId = req.params.id;
        await Volunteer.findByIdAndDelete(volunteerId);
        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const approveVolunteer = async (req, res) => {
    try {
        await Volunteer.findByIdAndUpdate(req.params.id, { status: 'Approved' });
        res.status(200).send('Request approved.');
    } catch (error) {
        res.status(500).send('Error approving request.');
    }
};

const rejectVolunteer = async (req, res) => {
    try {
        await Volunteer.findByIdAndUpdate(req.params.id, { status: 'Rejected' });
        res.status(200).send('Request rejected.');
    } catch (error) {
        res.status(500).send('Error rejecting request.');
    }
};

const VolunteerRequests = async(req,res) => {
    try{
        const response = await Volunteer.find();
        res.status(200).send(response);
    }
    catch{
        res.status(500).send('Error in getting volunteer request.');
    }
}


export {
    getVolunteers,
    addVolunteer,
    deleteVolunteer,
    approveVolunteer,
    rejectVolunteer,
    VolunteerRequests
};

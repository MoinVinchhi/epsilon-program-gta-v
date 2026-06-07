import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    eventName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
});
  
const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;

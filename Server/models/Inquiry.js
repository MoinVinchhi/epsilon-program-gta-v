import mongoose  from 'mongoose';

const inquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now },
});
  
const Inquiry =  mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
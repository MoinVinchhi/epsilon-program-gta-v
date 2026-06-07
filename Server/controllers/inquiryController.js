import Inquiry from '../models/Inquiry.js';
export const addInquiry = async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const newInquiry = new Inquiry({
        name,
        email,
        message,
      });
  
      await newInquiry.save();
      console.log('Inquiry received and stored:', { name, email, message });
      res.status(200).json({ success: true, message: 'Inquiry submitted successfully' });
    } catch (error) {
      console.error('Error saving inquiry:', error);
      res.status(500).json({ error: 'Failed to submit inquiry' });
    }
};
  
export const getInquiries = async (req, res) => {
    try {
      const inquiries = await Inquiry.find().sort({ date: -1 }); // Fetch all inquiries, newest first
      res.json(inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      res.status(500).json({ error: 'Unable to fetch inquiries' });
    }
};
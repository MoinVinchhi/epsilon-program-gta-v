import User from '../models/User.js';
export const cancelMembership = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Update the user's document in MongoDB
      await User.updateOne({ name: userId }, { $unset: { membership_id: "" } });
      res.status(200).json({ message: 'Membership cancelled successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling membership.', error });
    }
};
  
  
export const quizPoints = async (req, res) => {
    const { userId } = req.body;
    const {addPoints}=req.body;
    try {
      const user = await User.findOne({ name: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
        
      user.points = user.points+Number(addPoints);
      const updatedUser = await user.save();
      res.json({user: updatedUser});
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
    
};